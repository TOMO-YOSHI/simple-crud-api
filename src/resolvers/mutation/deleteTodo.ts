import { prisma } from '../../prisma/client';
import { MutationResolvers } from '../../types/generated/graphql';

export const deleteTodo: MutationResolvers['deleteTodo'] = async (_root, { id }, { auth }) => {
  if (!auth) {
    throw new Error('Unauthorized');
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: id
    }
  });

  // If the todo is not owned by the user who sent this request
  if (todo.userId !== auth.sub) {
    throw new Error('You do not have right permission.');
  }

  const deletedTodo = await prisma.todo.delete({
    where: {
      id
    }
  })
  return deletedTodo;
}