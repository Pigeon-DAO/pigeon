import { prisma } from "@server/db";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const pigeonRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello!!! ${input?.text ?? "world"}`,
  //     };
  //   }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  // get user based on their address
  getUserById: publicProcedure
    .input(z.object({ id: z.string().nullish() }).nullish())
    .query(({ input }) => {
      console.log(
        "testest",
        prisma?.account.findUnique({
          where: {
            id: input!.id!,
          },
        })
      );
      return prisma?.account.findUnique({
        where: {
          id: input!.id!,
        },
      });
    }),
});