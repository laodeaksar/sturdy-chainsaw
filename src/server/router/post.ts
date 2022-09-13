import crypto from 'crypto';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createRouter } from './context';

const getslug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const postRouter = createRouter()
  .query('get-all', {
    async resolve({ ctx }) {
      return ctx.prisma.post.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
        },
      });
    },
  })
  .query('find-by-slug', {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { slug } = input;

      const post = await ctx.prisma.post.findUnique({
        where: {
          slug,
        },
        select: {
          title: true,
          body: true,
          createdAt: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      return post;
    },
  })
  .query('get-views', {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { slug } = input;

      const views = await ctx.prisma.views.findUnique({
        where: {
          slug,
        },
      });

      if (!views) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      const total = views.count.toString();

      return total;
    },
  })
  .mutation('set-views', {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { slug } = input;

      const newOrUpdatedViews = await ctx.prisma.views.upsert({
        where: { slug },
        create: {
          slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      const total = newOrUpdatedViews.count.toString();

      return total;
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }

    return next();
  })
  .mutation('create-post', {
    input: z.object({
      title: z.string(),
      body: z.string(),
    }),
    resolve({ ctx, input }) {
      const { title, body } = input;

      const slug = `${getslug(title)}-${crypto.randomBytes(2).toString('hex')}`;

      const user = ctx.session?.user;

      return ctx.prisma.post.create({
        data: {
          title,
          body: sanitizeHtml(body, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a', 'code'],
            allowedAttributes: {
              a: ['href'],
            },
            allowedIframeHostnames: ['www.youtube.com'],
          }),
          slug,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
    },
  });
