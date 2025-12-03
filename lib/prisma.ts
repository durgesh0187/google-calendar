// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global prisma in dev to prevent hot-reload creating many clients
  // eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV === "development") global.prisma = prisma;
