import { Suspense } from 'react';
import type { NextPage } from 'next';
import { Box, Grid, H2 } from '@laodeaksarr/design-system';

import BlogCard from '~/theme/components/Blog';
import Layout from '~/theme/layout';

import { Post } from '~/utils/trpc';

const PostPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Suspense fallback={null}>
      <Layout
        footer
        header
        //title="Blog Page"
        headerProps={{ offsetHeight: 256 }}
      >
        <Grid columns="medium" gapX={4} gapY={12} all>
          <Box as="section">
            <H2>All articles</H2>
            <BlogCard posts={posts} />
          </Box>
        </Grid>
      </Layout>
    </Suspense>
  );
};

export default PostPage;
