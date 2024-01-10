export const LOCK_KEYS = {
  updateCardsAfterTraining: 'updateCardsAfterTraining',
  creatingNewShelf: 'creatingNewShelf',
  removingShelfToTrash: 'removingShelfToTrash',
  removingBoxFromShelfToTrash: 'removingBoxFromShelfToTrash',
} as const;
export type LockKeys = keyof typeof LOCK_KEYS;
