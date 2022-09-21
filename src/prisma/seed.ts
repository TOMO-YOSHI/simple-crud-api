require('dotenv').config()
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
// import { prisma, User } from './client';
const { PrismaClient, User } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  // await createCategories();
  const users = await createUsers();
  const promises = users.map((user) => {
    return createTodos(user);
  });
  const todos = await Promise.all(promises);
  console.log({
    users,
    todos,
  });
};

const createUsers = async () => {
  const promises = [...Array(3)].map((_, i) => {
    // const userId = `${i + 1}`;
    const userId = uuidv4();

    const saltRounds = process.env.SOLTROUNDS;
    const hash = bcrypt.hashSync(`password${i + 1}`, saltRounds);

    return prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: `user_${i + 1}`,
        password: hash
      },
    });
  });
  return await Promise.all(promises);
};

const createTodos = async (user: typeof User) => {
  const categoriesArr = ["hobby", "work", "study", "other"];

  const promises = [...Array(4)].map((_, i) => {
    const number = i + 1;
    return prisma.todo.create({
      data: {
        title: `${user.name}_todo_${number}_title`,
        description: `${user.name}_todo_${number}_description`,
        category: categoriesArr[i],
        status: 'pending',
        priority: number,
        userId: user.id,
      },
    });
  });
  return await Promise.all(promises);
};

// const createCategories = async() => {
//   const categoriesArr = ["other", "work", "study", "hobby"];
//   const promises = [...Array(4)].map((_, i) => {
//     return prisma.category.create({
//       data: {
//         type: categoriesArr[i]
//       },
//     });
//   });
//   return await Promise.all(promises);
// }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });