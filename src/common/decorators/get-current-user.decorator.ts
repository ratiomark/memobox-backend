import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (userKey: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!userKey) return request.user;
    return request.user[userKey];
  },
);
