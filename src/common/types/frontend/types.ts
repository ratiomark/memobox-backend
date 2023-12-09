export type MissedTrainingValue = 'none' | 'additional' | 'backwards';

export interface TimingBlock {
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}

export interface DataBlock {
  wait: number;
  all: number;
  train: number;
}
export type AnswerType = 'good' | 'bad' | 'middle';
