import React from 'react';
import type { NextPage } from 'next';

import { Grid, H2, Text } from '@laodeaksarr/design-system';

import GuestbookComponent from '~/theme/components/guestbook';

import Layout from '~/theme/layout';

const Guestbook: NextPage = () => {
  return (
    <Layout
      footer
      header
      headerProps={{ offsetHeight: 256 }}
    >
      <Grid columns="medium" gapX={4} gapY={12} all>
        <div>
          <H2>Guestbook</H2>
          <Text as="p">
            Leave a comment below. It could be anything - appreciation,
            information, wisdom, or even humor. Surprise me!
          </Text>
          <GuestbookComponent />
        </div>
      </Grid>
    </Layout>
  );
};

export default Guestbook;
