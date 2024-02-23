import { EmailTypes } from '@/common/const/email-types';

export interface MailData<T = never> {
  to: string;
  data: T;
  emailType: EmailTypes;
  language: string;
}
