import { PartialType } from '@nestjs/swagger';
import { CreateShelfDto } from './create-shelf.dto';

export class UpdateShelfDto extends PartialType(CreateShelfDto) {}
