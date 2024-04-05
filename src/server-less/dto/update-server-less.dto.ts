import { PartialType } from '@nestjs/swagger';
import { CreateServerLessDto } from './create-server-less.dto';

export class UpdateServerLessDto extends PartialType(CreateServerLessDto) {}
