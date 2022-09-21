const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    hello: (_root: any, { input }: any, { auth }: any) => {
      console.log("context", auth);
      if(!auth) {
        throw new Error('Unauthorized');
      }
      return 'Hello world!';
    },
    todo: (_root: any, { id }: any) => {
      return prisma.todo.findUnique({
        where: {
          id: parseInt(id)
        }
      })
    },
    todos: async (_root: any, { priority, status, category }: any) => {
      return prisma.todo.findMany({
        where: {
          AND: [
            {
              priority: parseInt(priority)
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
    }
  },

  Mutation: {
    createTodo: async (_root: any, { input }: any, { auth }: any) => {
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
    },
    updateTodo: async (_root: any, { id, input }: any, { auth }: any) => {
      if (!auth) {
        throw new Error('Unauthorized');
      }

      const todo = await prisma.todo.findUnique({
        where: {
          id: parseInt(id)
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
    },
    deleteTodo: async (_root: any, { id }: any, { auth }: any) => {
      if (!auth) {
        throw new Error('Unauthorized');
      }

      const todo = await prisma.todo.findUnique({
        where: {
          id: parseInt(id)
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
  }

  // Todo: {
  //   // category: ({category} : Todo) => {
  //   //   const cat = categories.filter(el => el.id == category);
  //   //   return cat[0];
  //   // }
  //   category: (todo: any) => {
  //     console.log(todo);
  //     const cat = categories.filter(el => el.id == todo.category);
  //     return cat[0];
  //   }
  // }
};