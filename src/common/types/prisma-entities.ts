import { Box, Card, Shelf, User } from '@prisma/client';

export type UserId = User['id'];
export type ShelfId = Shelf['id'];
export type BoxId = Box['id'];
export type CardId = Card['id'];
