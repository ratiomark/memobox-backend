import { Shelf, Box, Card } from '@prisma/client';

export type PartialShelf = Omit<Shelf, 'createdAt' | 'updatedAt'>;
export type PartialBox = Omit<Box, 'createdAt' | 'updatedAt' | 'timing'>;
export type PartialCard = Omit<
  Card,
  'createdAt' | 'updatedAt' | 'lastTraining' | 'nextTraining'
>;
export type CardBase = {
  answer: string;
  question: string;
};
