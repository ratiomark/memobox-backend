import { BoxSpecialType, Shelf, Box } from '@prisma/client';

// export class Card {}
export type TrainingCardsCondition = {
  userId: string;
  isDeleted: boolean;
  box?: { specialType: BoxSpecialType };
  shelfId?: Shelf['id'];
  boxId?: Box['id'];
  OR: (
    | {
        nextTraining: {
          gt: Date;
        };
      }
    | {
        nextTraining: null;
      }
  )[];
};
