import { prisma } from '../../prisma/client';
import { MutationResolvers } from '../../types/generated/graphql';

export const createTodo: MutationResolvers['createTodo'] = async(_root, { input }, { auth }) => {
  if (!auth) {
    throw new Error('Unauthorized');
  }

  const todo = await prisma.todo.create({
    data: {
      ...input,
      userId: auth.sub
    }
  })
  return todo;
}