import { Suspense } from 'react';
import { customAlphabet } from 'nanoid';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

import Layout from '~/theme/layout';
import { Grid } from '@laodeaksarr/design-system';
import { Button } from '@mantine/core';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvqxyz0123456789', 4);

const Home: NextPage = () => {
  const router = useRouter();

  function createRoom() {
    const roomId = nanoid();

    router.push(`/rooms/${roomId}`);
  }

  return (
    <Suspense fallback={null}>
      <Layout headerProps={{ offsetHeight: 256 }}>
        <Grid columns="medium" gapX={4} gapY={12} all>
          <main>
            <Button onClick={createRoom}>create chat room</Button>
          </main>
        </Grid>
      </Layout>
    </Suspense>
  );
};

export default Home;
