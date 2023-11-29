export type SortColumnValue =
  | 'shelfId'
  | 'createdAt'
  | 'lastTraining'
  | 'nextTraining';

export interface SortColumnObject {
  value: SortColumnValue;
  content: string;
  enabled: boolean;
  index: number;
}

export interface ShelfNameItem {
  title: string;
  isCollapsed: boolean;
  id: string;
}

export interface JsonSavedData {
  // viewPageShelfId?: string
  // viewPageBoxId?: string
  viewPageCardRowsCount: number | string | undefined;
  commonShelfCollapsed: true;
  viewPageColumns: SortColumnObject[];
}

const viewPageColumns = [
  {
    index: 0,
    value: 'shelfId',
    content: 'COLUMN_shelf',
    enabled: true,
  },
  {
    index: 1,
    value: 'createdAt',
    content: 'COLUMN_creation',
    enabled: true,
  },
  {
    index: 2,
    value: 'lastTraining',
    content: 'COLUMN_last_training',
    enabled: true,
  },
  {
    index: 3,
    value: 'nextTraining',
    content: 'COLUMN_next_training',
    enabled: true,
  },
];

export const jsonSettingsDefault = {
  theme: 'app_light_theme',
  isFirstVisit: true,
  settingsPageHasBeenOpen: false,
};

export const jsonSavedDataDefault = {
  viewPageCardRowsCount: 2,
  commonShelfCollapsed: true,
  viewPageColumns,
};
