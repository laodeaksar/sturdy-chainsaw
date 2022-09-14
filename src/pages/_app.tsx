import '~/styles/global.css';
import '~/styles/font.css';

import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import {
  globalStyles,
  ThemeProvider,
  Toast,
  Tooltip,
} from '@laodeaksarr/design-system';

import { AppRouter } from '~/server/router';

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ session: Session }>): JSX.Element => {
  globalStyles();

  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <Toast.Provider swipeDirection="right">
          <Tooltip.Provider>
            <Component {...pageProps} />
          </Tooltip.Provider>
        </Toast.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const url = `${getBaseUrl()}/api/trpc`;

function getEndingLink() {
  if (typeof window === 'undefined') {
    return httpBatchLink({
      url,
    });
  }

  const client = createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
  });

  return wsLink<AppRouter>({
    client,
  });
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      links: [
        // pass logger link in here
        getEndingLink(),
      ],
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers: () => {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
          };
        }
        return {};
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  responseMeta({ clientErrors, ctx }) {
    if (clientErrors.length) {
      // propagate first http error from API calls
      return {
        status: clientErrors[0]?.data?.httpStatus ?? 500,
      };
    }
    // cache full page for 1 day + revalidate once every second
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      'Cache-Control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
    };
  },
})(MyApp);
