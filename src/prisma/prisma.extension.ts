import { PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient().$extends({
  model: {
    user: {
      findByEmail: async (email: string) => {
        return extendedPrismaClient.user.findFirstOrThrow({ where: { email } });
      },
    },
  },
});
