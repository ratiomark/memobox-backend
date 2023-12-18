import { TimingBlock, AnswerType } from './frontend/types';
import { CardId } from './prisma-entities';
export type CupboardObject = Record<string, ShelfData>;
export interface ShelfData {
  maxBoxIndex: number;
  boxes: Record<string, BoxData>;
}
// export interface ShelfData {
//   maxBoxIndex: number;
//   [boxId: string]: BoxData;
// }

export interface BoxData {
  nextBoxIdKey: string | null;
  previousBoxIdKey: string | null;
  timing: TimingBlock;
  index: number;
}

export interface CardTrainingData {
  id: CardId;
  shelfId: string;
  boxId: string;
  answer: AnswerType;
  now: Date | string;
}

export interface TrainingOutcome {
  boxId: string;
  nextTraining: Date | string;
  id: CardId;
}
