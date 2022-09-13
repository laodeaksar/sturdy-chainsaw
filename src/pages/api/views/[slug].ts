import type { NextApiRequest, NextApiResponse } from 'next';

import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  ServerError,
} from '~/lib/api';

import { prisma } from '~/server/db/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['GET', 'POST'])) {
    return MethodNotAllowed(res);
  }

  try {
    const slug = req.query.slug as string;

    if (!slug) {
      return BadRequest(res, 'Invalid slug');
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug,
        },
      });

      if (!views) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({ total: views.count.toString() });
    }

    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
    });

    if (!post) {
      return BadRequest(res, 'Post not found');
    }

    const newOrUpdatedViews = await prisma.views.upsert({
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

    return res.status(200).json({
      total: newOrUpdatedViews.count.toString(),
    });
  } catch (e) {
    return ServerError(res, e);
  }
}
