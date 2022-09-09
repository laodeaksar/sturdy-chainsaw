import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class Document extends NextDocument {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            type="font/woff2"
            href="/fonts/ibm-plex-sans-var.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="webmention"
            href="https://webmention.io/www.laodeaksar.eu.org/webmention"
          />
          <link
            rel="pingback"
            href="https://webmention.io/www.laodeaksar.eu.org/xmlrpc"
          />
          <meta
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            name="robots"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
