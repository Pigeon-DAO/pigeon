import { router } from "../trpc";
import { authRouter } from "./auth";
import { pigeon } from "./pigeon";

export const appRouter = router({
  pigeon: pigeon,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
