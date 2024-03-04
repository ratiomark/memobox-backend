import {
  ClassSerializerInterceptor,
  LogLevel,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { validationOptions } from '@/utils/validation-options';
import { AllConfigType } from './config/config.type';

process.env.TZ = 'Etc/UTC';

const DOCS_ROUTE = 'docs';

async function bootstrap() {
  const logger = new Logger();
  const loggerLevels: LogLevel[] =
    process.env.NODE_ENV === 'testing'
      ? ['error', 'warn']
      : ['error', 'warn', 'log', 'debug', 'verbose'];

  const app = await NestFactory.create(AppModule, {
    cors: true,
    snapshot: true,
    logger: loggerLevels,
    // logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService<AllConfigType>);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableShutdownHooks();
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(DOCS_ROUTE, app, document);

  await app.listen(
    configService.getOrThrow('app.port', { infer: true }),
    () => {
      logger.log(
        `Listening on port http://localhost:${configService.getOrThrow(
          'app.port',
          {
            infer: true,
          },
        )}`,
      );
      logger.log(
        `Docs on route http://localhost:${configService.getOrThrow('app.port', {
          infer: true,
        })}/${DOCS_ROUTE}`,
      );
      logger.log(
        `Using NODE_ENV = ${configService.getOrThrow('app.nodeEnv', {
          infer: true,
        })}`,
      );
      logger.log(`Timezone сервера: ${process.env.TZ}`);
      logger.log(`Время сервера: ${new Date().toLocaleString()}`);
    },
  );
  // process.on('SIGTERM', async () => {
  //   logger.log('Закрытие сервера NestJS...');
  //   await app.close();
  //   logger.log('Сервер NestJS закрыт.');
  //   process.exit(0); // Явно завершает процесс Node.js
  // });

  process.on('SIGINT', async () => {
    logger.log('Закрытие сервера NestJS (SIGINT)...');
    await app.close();
    logger.log('Сервер NestJS закрыт (SIGINT).');
    process.exit(0); // Явно завершает процесс Node.js
  });
}
void bootstrap();
