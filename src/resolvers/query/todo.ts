import { prisma } from '../../prisma/client';
import { QueryResolvers } from '../../types/generated/graphql';

export const todo: QueryResolvers['todo'] = async (_root, { id }) => {
  return prisma.todo.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}
