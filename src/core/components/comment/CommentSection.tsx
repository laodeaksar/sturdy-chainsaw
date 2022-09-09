import { useRouter } from 'next/router';
import { Box } from '@laodeaksarr/design-system';

import formComment from 'helpers/formatComment';
import { trpc } from '~/utils/trpc';

import ListComment from './ListComments';
import CommentForm from './CommentForm';

function CommentSection() {
  const router = useRouter();

  const permalink = router.query.slug as string;

  const { data } = trpc.useQuery(['comments.all-comments', { permalink }]);

  return (
    <Box>
      <CommentForm />
      {data && <ListComment comments={formComment(data || [])} />}
    </Box>
  );
}

export default CommentSection;
