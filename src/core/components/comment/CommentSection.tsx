import { useRouter } from 'next/router';
import { Box } from '@laodeaksarr/design-system';

import formComments from '~/helpers/formatComment';
import { trpc } from '~/utils/trpc';

import ListComment from './ListComments';
import CommentForm from './CommentForm';

function CommentSection() {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { data } = trpc.useQuery([
    'comments.all-comments',
    {
      slug,
    },
  ]);

  return (
    <Box>
      <CommentForm />
      {data && <ListComment comments={formComments(data || [])} />}
    </Box>
  );
}

export default CommentSection;
