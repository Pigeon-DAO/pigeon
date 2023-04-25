import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  getUserByAddress: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          address: input.address,
        },
      });
      return user;
    }),
  linkAddress: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          address: input.address,
        },
      });
      return user;
    }),
});
