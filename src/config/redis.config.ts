import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import { IsString, IsInt, IsOptional } from 'class-validator';
import { RedisConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  host: string;

  @IsInt()
  @IsOptional()
  port: number;
}

export default registerAs<RedisConfig>('redis', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  };
});
