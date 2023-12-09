import { TimingBlock, AnswerType } from './frontend/types';
export type CupboardObject = Record<string, ShelfData>;
export interface ShelfData {
  [boxId: string]: BoxData;
}

export interface BoxData {
  nextBoxIdKey: string | null;
  previousBoxIdKey: string | null;
  timing: TimingBlock;
  index: number;
}

export interface CardTrainingData {
  shelfId: string;
  boxId: string;
  answer: AnswerType;
}

export interface TrainingOutcome {
  boxId: string;
  nextTraining: Date;
}
