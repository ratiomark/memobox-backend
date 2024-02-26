import { UserLoginResponseDto } from '@/users/dto/user-login-response.dto';
import { User } from '@prisma/client';

// Пока что использую этот тип (вход через соц. сети), но в будущем его нужно будет заменить на UserLoginResponseDto
export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;

export type LoginResponseTypeProd = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: UserLoginResponseDto;
}>;

export type RefreshInitResponseType = LoginResponseTypeProd;
