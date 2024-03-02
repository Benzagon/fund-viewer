import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const postId = Number(req.query.id)
    const result = await prisma.movie.findFirst({
        where: {
            id: postId
        }
    })
    if(!result) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    return res.status(200).json(result);
}
