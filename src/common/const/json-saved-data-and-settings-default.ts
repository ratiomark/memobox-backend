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
  cupboard?: {
    isDelimiterEnabled?: boolean;
    isStartTrainingHotKeyVisible?: boolean;
    isToolTipVisible?: boolean;
  };
}

const viewPageColumns: SortColumnObject[] = [
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

export type Theme = 'app_dark_theme' | 'app_light_theme';

export interface JsonSettings {
  theme?: Theme;
  isFirstVisit?: boolean;
  settingsPageHasBeenOpen?: boolean;
  postRegistrationStep: PostRegistrationStep;
  hasCreatedFirstShelf: boolean;
}
export type PostRegistrationStep =
  | 'LANGUAGE_CONFIRMATION'
  | 'TIMEZONE_CONFIRMATION'
  | 'TIMEZONE_SETUP'
  | 'COMPLETED';

export const jsonSettingsDefault: JsonSettings = {
  theme: 'app_light_theme',
  isFirstVisit: true,
  settingsPageHasBeenOpen: false,
  postRegistrationStep: 'LANGUAGE_CONFIRMATION',
  hasCreatedFirstShelf: false,
};

export const jsonSavedDataDefault: JsonSavedData = {
  viewPageCardRowsCount: 2,
  commonShelfCollapsed: true,
  viewPageColumns,
  cupboard: {
    isDelimiterEnabled: true,
    isStartTrainingHotKeyVisible: true,
    isToolTipVisible: true,
  },
};
