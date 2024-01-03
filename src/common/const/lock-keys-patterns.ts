export const LOCK_KEYS = {
  updateCardsAfterTraining: 'updateCardsAfterTraining',
  creatingNewShelf: 'creatingNewShelf',
  removingShelfToTrash: 'removingShelfToTrash',
} as const;
export type LockKeys = keyof typeof LOCK_KEYS;
