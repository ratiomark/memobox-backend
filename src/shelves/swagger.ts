import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { ShelfFrontedResponseClass } from './entities/shelf.entity';

export function SwaggerCreateNewShelf() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a new shelf' }),
    ApiResponse({
      status: 201,
      description: 'Shelf successfully created',
      type: ShelfFrontedResponseClass,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
    ApiBody({ type: CreateShelfDto }),
  );
}
