"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.prisma = void 0;
const { PrismaClient, User } = require('@prisma/client');
// module.exports = {
//   prisma: new PrismaClient(),
//   User: User
// }
exports.prisma = new PrismaClient();
exports.user = User;
