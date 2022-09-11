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
    const permalink = req.query.permalink as string;

    if (!permalink) {
      return BadRequest(res, 'Invalid permalink');
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          permalink,
        },
      });

      if (!views) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({ total: views.count.toString() });
    }

    const post = await prisma.post.findUnique({
      where: {
        permalink,
      },
    });

    if (!post) {
      return BadRequest(res, 'Post not found');
    }

    const newOrUpdatedViews = await prisma.views.upsert({
      where: { permalink },
      create: {
        permalink,
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
