import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { AllConfigType } from 'src/config/config.type';
import { File } from '@prisma/client';
import path from 'path';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly prisma: PrismaService,
  ) {}

  async uploadFile(
    file: Express.Multer.File | Express.MulterS3.File,
  ): Promise<File> {
    this.validateFile(file);
    const filePath = this.getFilePath(file);
    const createdFile = await this.createFile(filePath);
    return {
      id: createdFile.id,
      path: createdFile.path,
    };
  }

  async createFile(filePath: string): Promise<File> {
    return this.prisma.file.create({
      data: {
        path: filePath,
      },
    });
  }

  async findFileById(id: string): Promise<File> {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    file.path = this.updatePath(file.path);
    return file;
  }

  private validateFile(
    file: Express.Multer.File | Express.MulterS3.File,
  ): void {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private getFilePath(
    file: Express.Multer.File | Express.MulterS3.File,
  ): string {
    const driver = this.configService.getOrThrow('file.driver', {
      infer: true,
    });
    let filePath: string | undefined;

    if (driver === 'local') {
      filePath = `/${this.configService.get('app.apiPrefix', {
        infer: true,
      })}/v1/${file.path}`;
    } else if (driver === 's3') {
      filePath = (file as Express.MulterS3.File).location;
    }

    if (!filePath) {
      throw new Error('Path is undefined');
    }

    return this.updatePath(filePath);
  }

  private updatePath(inputPath: string): string {
    const normalizedPath = path.normalize(inputPath);
    const urlPath = normalizedPath.split(path.sep).join('/');

    if (urlPath.indexOf('/') !== 0) {
      return `${this.configService.get('app.backendDomain', {
        infer: true,
      })}/${urlPath}`;
    }
    return urlPath;
  }
}
