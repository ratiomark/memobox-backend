import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AggregateService {
  constructor(private readonly prisma: PrismaService) {}

  async getDbTimeAndTimezone() {
    return await this.prisma.$queryRawUnsafe(
      `SELECT NOW() as current_time, (SELECT setting FROM pg_settings WHERE name = 'TimeZone') as timezone;`,
    );
  }
}
