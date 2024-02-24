import { User } from '@prisma/client';

type UserData = Partial<User> & {
  jsonSavedData: any;
  jsonSettings: any;
  email: string;
  firstName: string;
};

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: UserData;
}>;

export type RefreshInitResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: UserData;
}>;
