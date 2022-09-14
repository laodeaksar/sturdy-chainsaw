import { H3, Skeleton, Text } from '@laodeaksarr/design-system';
import { useRouter } from 'next/router';

import CommentSection from '~/theme/components/comment/CommentSection';
import Layout from '~/theme/layout';

import { trpc } from '~/utils/trpc';

function PostPage() {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { data: postData, isLoading } = trpc.useQuery([
    'posts.find-by-slug',
    {
      slug,
    },
  ]);

  return (
    <Layout>
      <Skeleton visible={isLoading}>
        <H3>{postData?.title}</H3>
      </Skeleton>

      <Skeleton visible={isLoading}>
        <Text>
          <span>
            Posted by {postData?.user.name} at{' '}
            {postData?.createdAt.toLocaleDateString('en-US', {
              dateStyle: 'medium',
            })}
          </span>
        </Text>
      </Skeleton>

      <Skeleton visible={isLoading}>
        <div dangerouslySetInnerHTML={{ __html: postData?.body || '' }} />
      </Skeleton>

      <CommentSection />
    </Layout>
  );
}

export default PostPage;
