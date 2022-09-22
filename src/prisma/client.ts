const { PrismaClient, User } = require('@prisma/client');

export const prisma = new PrismaClient();
export const user = User;