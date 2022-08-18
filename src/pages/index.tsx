import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { customAlphabet } from "nanoid";
import { useRouter } from "next/router";
import { Suspense } from "react";

import Layout from "~/layout";
import { Grid } from "@laodeaksarr/design-system";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvqxyz0123456789", 4);

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
          <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
            <button onClick={createRoom}>create chat room</button>
          </main>
        </Grid>
      </Layout>
    </Suspense>
  );
};

export default Home;
