import { Shelf } from '@prisma/client';

export type ShelfIdAndIndex = {
  id: Shelf['id'];
  index: number;
};

export type ShelfOrderRequest = ShelfIdAndIndex[];

export interface UpdateShelfDto {
  id: Shelf['id'];
  index?: number;
  title?: string;
  isCollapsed?: boolean;
  // missedTrainingValue?: MissedTrainingValue;
  notificationEnabled?: boolean;
}
