import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

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
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          address: input.address,
        },
      });
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
