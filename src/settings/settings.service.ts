import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSettingDto: CreateSettingDto) {
    return 'This action adds a new setting';
  }

  getShelfTemplate(userId: User['id']) {
    return this.prisma.shelfTemplate.findMany({
      where: { OR: [{ userId: userId }, { userId: null }] },
    });
  }
  findAll() {
    return `This action returns all settings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
