import { TimingBlock, AnswerType } from './frontend/types';
import { BoxId, CardId, ShelfId } from './prisma-entities';

export type CupboardObject = Record<ShelfId, ShelfData>;

export interface ShelfData {
  maxBoxIndex: number;
  boxes: Record<BoxId, BoxData>;
}
// export interface ShelfData {
//   maxBoxIndex: number;
//   [boxId: string]: BoxData;
// }

export interface BoxData {
  nextBoxIdKey: BoxId;
  previousBoxIdKey: BoxId;
  timing: TimingBlock;
  index: number;
}

export interface CardTrainingData {
  id: CardId;
  shelfId: ShelfId;
  boxId: BoxId;
  answer: AnswerType;
  now: Date;
}

export interface TrainingOutcome {
  boxId: BoxId;
  nextTraining: string; // date.toISOString()
  id: CardId;
}
