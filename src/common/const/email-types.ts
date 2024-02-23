export const EMAIL_TYPES = {
  welcome: 'welcome',
  forgotPassword: 'forgotPassword',
  activateEmail: 'activateEmail',
} as const;

export type EmailTypes = keyof typeof EMAIL_TYPES;
