import { createRouter } from './context';
import {
  singleGuestbookSchema,
  guestbookSchema,
  updateGuestbookSchema
} from '../../constants/schemas';

export const guestbookRouter = createRouter()
  .mutation('add', {
    input: guestbookSchema,
    async resolve({ input, ctx }) {
      const user = ctx.session?.user;

      const guestbook = await ctx.prisma.guestbook.create({
        data: {
          ...input,
          email: user?.email || 'unknown',
          created_by: user?.name || 'unknown'
        }
      });

      return guestbook;
    }
  })
  .query('all', {
    resolve({ ctx }) {
      return ctx.prisma.guestbook.findMany({
        orderBy: {
          created_at: 'desc'
        }
      });
    }
  })
  .query('byId', {
    input: singleGuestbookSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.guestbook.findUnique({
        where: {
          id: input.id
        }
      });
    }
  })
  .mutation('edit', {
    input: updateGuestbookSchema,
    async resolve({ input, ctx }) {
      const post = await ctx.prisma.guestbook.update({
        where: {
          id: input.id
        },
        data: {
          ...input
        }
      });

      return post;
    }
  })
  .mutation('delete', {
    input: singleGuestbookSchema,
    async resolve({ input, ctx }) {
      const { id } = input;

      await ctx.prisma.guestbook.delete({
        where: { id }
      });

      return {
        id
      };
    }
  });
