import { PrismaClient } from "@prisma/client";
export const db = new PrismaClient();
export { db as prisma };
