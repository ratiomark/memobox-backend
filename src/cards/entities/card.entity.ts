import { BoxSpecialType, Shelf, Box, $Enums, Card, User } from '@prisma/client';

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
          lt: Date;
        };
      }
    | {
        nextTraining: null;
      }
  )[];
};

export type CardIncBox = Card & {
  box: {
    index: number;
    specialType: $Enums.BoxSpecialType;
  };
};
export type CardIncUser = Card & { user: User };
