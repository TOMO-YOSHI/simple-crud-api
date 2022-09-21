const { PrismaClient, User } = require('@prisma/client')

// module.exports = {
//   prisma: new PrismaClient(),
//   User: User
// }

export const prisma = new PrismaClient();
export const user = User