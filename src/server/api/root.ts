import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { pigeonRouter } from "./routers/pigeon";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  pigeon: pigeonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
