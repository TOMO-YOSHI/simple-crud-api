import { prisma } from '../../prisma/client';
import { MutationResolvers } from '../../types/generated/graphql';

export const updateTodo: MutationResolvers['updateTodo'] = async (_root, { id, input }, { auth }) => {
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

  const updatedTodo = await prisma.todo.update({
    where: {
      id: id
    },
    data: {
      title: input.title,
      description: input.description,
      category: input.category,
      status: input.status,
      priority: input.priority,
    },
  })
  return updatedTodo;
}