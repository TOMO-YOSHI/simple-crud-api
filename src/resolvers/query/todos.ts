import { prisma } from '../../prisma/client';
import { QueryResolvers } from '../../types/generated/graphql';

export const todos: QueryResolvers['todos'] = async(_root, { priority, status, category }) => {
  return prisma.todo.findMany({
    where: {
      AND: [
        {
          priority
        },
        {
          status
        },
        {
          category
        }
      ]
    }
  });
};
