import { PrismaClient } from "@prisma/client";

import { env } from "~/env/server.mjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development"
        ? env.PRISMA_LOG_QUERY_IN_DEV === "true"
          ? ["query", "error", "warn"]
          : ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
