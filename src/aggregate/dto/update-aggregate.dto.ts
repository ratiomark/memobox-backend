import { PartialType } from '@nestjs/swagger';
import { CreateAggregateDto } from './create-aggregate.dto';

export class UpdateAggregateDto extends PartialType(CreateAggregateDto) {}
