import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetCurrentUser } from '@/common/decorators';
import { UserDataStorageService } from '@/user-data-storage/user-data-storage.service';
import { WaitForUnlock } from '@/common/decorators/wait-for-unlock.decorator';
import { LOCK_KEYS } from '@/common/const/lock-keys-patterns';
import { exec } from 'child_process';
import { promisify } from 'util';
import { AllConfigType } from '@/config/config.type';
import { ConfigService, PathImpl2 } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';

const execAsync = promisify(exec);

@ApiTags('Aggregate')
@Controller({
  path: 'aggregate',
  version: '1',
})
export class AggregateController {
  constructor(
    private readonly userDataStorageService: UserDataStorageService,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly prisma: PrismaService,
  ) {}

  @Get('view')
  @WaitForUnlock(LOCK_KEYS.creatingNewShelf)
  @WaitForUnlock(LOCK_KEYS.removingShelfToTrash)
  async getViewPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getViewPageData(userId);
  }

  @Get('timezone')
  async getDbTimeZone() {
    const tz = await this.userDataStorageService.getDbTimeZone();
    console.log(tz);
    return tz;
  }

  @Get('cupboard')
  @WaitForUnlock(LOCK_KEYS.updateCardsAfterTraining)
  async getCupboardPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getCupboardPageData(userId);
  }

  @Get('trash')
  getTrashPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getTrashPageData(userId);
  }

  @Get('server-time')
  getServerTime() {
    return new Date();
  }

  // D:\Programs\PostgreSQL\bin\pg_dump -U postgres memobox > D:\Programs\PostgreSQL\bin\db_backup.sql
  // D:\Programs\PostgreSQL\bin\psql -U postgres -d memobox -f D:\Programs\PostgreSQL\bin\db_backup.sql

  // D:\Programs\PostgreSQL\bin\psql -U postgres -d memobox
  // show client_encoding;
  // set client_encoding to 'UTF8';

  @Post('save-db')
  async backupDatabase(): Promise<string> {
    await this.prisma.$disconnect();
    const [dbName, username, dbPassword, postgresBinPath] = [
      'name',
      'username',
      'password',
      'postgresBinPath',
    ].map((key) =>
      this.configService.getOrThrow(
        `database.${key}` as PathImpl2<AllConfigType>,
        {
          infer: true,
        },
      ),
    );
    try {
      if (!postgresBinPath) {
        throw new Error('Не указан путь к бинарникам postgres');
      }
      const { stdout } = await execAsync(
        `${postgresBinPath}\\pg_dump -U ${username} --clean ${dbName} > ${postgresBinPath}\\db_backup.dump`,
        {
          env: {
            PGPASSWORD: dbPassword,
          },
        },
      );
      console.log('Бд сохраненна');
      return stdout;
    } catch (error) {
      console.error('Ошибка при создании резервной копии:', error);
      return error;
    } finally {
      await this.prisma.$connect();
    }
  }

  @Post('restore-db')
  async restoreDatabase(): Promise<string> {
    const nodeEnv = this.configService.getOrThrow('app.nodeEnv', {
      infer: true,
    });
    if (nodeEnv === 'production') {
      throw new Error('Нельзя восстановить базу данных в продакшене');
    }
    await this.prisma.$disconnect();
    const [dbName, username, dbPassword, postgresBinPath] = [
      'name',
      'username',
      'password',
      'postgresBinPath',
    ].map((key) =>
      this.configService.getOrThrow(
        `database.${key}` as PathImpl2<AllConfigType>,
        {
          infer: true,
        },
      ),
    );
    try {
      if (!postgresBinPath) {
        throw new Error('Не указан путь к бинарникам postgres');
      }
      const { stdout } = await execAsync(
        `${postgresBinPath}\\psql -U ${username} -d ${dbName} -f ${postgresBinPath}\\db_backup.dump`,
        {
          env: {
            PGPASSWORD: dbPassword,
          },
        },
      );
      console.log('Бд восстановлена');
      return stdout;
    } catch (error) {
      console.error('Ошибка при восстановлении базы данных:', error);
      throw error;
    } finally {
      await this.prisma.$connect();
    }
  }
}
