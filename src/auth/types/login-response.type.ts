import { User } from '@prisma/client';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;

export type RefreshInitResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: {
    jsonSavedData: any;
    jsonSettings: any;
    email: string;
    firstName: string;
  };
}>;
