import { PartialType } from '@nestjs/swagger';
import { CreateShelfDto } from './create-shelf.dto';
import { Shelf } from '@prisma/client';

export class UpdateShelfDto extends PartialType(CreateShelfDto) {
  id: Shelf['id'];
  index?: number;
  title?: string;
  isCollapsed?: boolean;
  // missedTrainingValue?: MissedTrainingValue;
  // notificationEnabled?: boolean;
}
