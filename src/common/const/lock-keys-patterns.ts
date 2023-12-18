export const LOCK_KEYS = {
  updateCardsAfterTraining: 'updateCardsAfterTraining',
} as const;
export type LockKeys = keyof typeof LOCK_KEYS;
