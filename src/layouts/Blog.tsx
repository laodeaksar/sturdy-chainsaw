import React, { Suspense } from 'react';

import {
  Box,
  Flex,
  formatDate,
  Grid,
  Pill,
  Text
} from '@laodeaksarr/design-system';

import Hero from '~/theme/components/Hero';
import Link from '~/theme/components/Link';
import TableOfContent from '~/theme/components/TableOfContent';
import Layout from '~/theme/layout';

//import { getColor } from '~/lib/getColor';
//import generateSocialImage from '~/lib/OpenGraph';
import { Post } from '@prisma/client';

const BlogLayout = ({
  children,
  post
}: React.PropsWithChildren<{ post: Post }>) => {
  const {
    date,
    updated,
    permalink,
    description,
    title,
    readingTime,
    image,
    // tags,
    // url
  } = post;
  const headerProps = {
    title,
    offsetHeight: 256,
    showProgressBarOnMobile: true
  };

  const [ids, setIds] = React.useState<Array<{ id: string; title: string }>>(
    []
  );

  React.useEffect(() => {
    setTimeout(() => {
      const titles = document.querySelectorAll('h2');
      const idArrays = Array.prototype.slice
        .call(titles)
        .map((title: { id: any; innerText: any }) => ({
          id: title.id,
          title: title.innerText
        })) as Array<{
        id: string;
        title: string;
      }>;
      setIds(idArrays);
    }, 500);
  }, [permalink]);

  /*const socialImage = generateSocialImage({
    title,
    underlayImage: image?.url
  });*/

  // const keywords = tags.join(", ");

  return (
    <Layout
      footer
      header
      // title={title}
      // description={description}
      // date={new Date(date).toISOString()}
      // imageUrl={socialImage}
      // type="article"
      headerProps={headerProps}
    >
      <article className="h-entry">
        <Suspense fallback={false}>
          <Grid columns="small" gapX={4}>
            <Hero>
              <Box
                css={{
                  marginBottom: '24px',
                  fontSize: '$2'
                }}
              >
                <Link href="/" arrow="left" discreet>
                  Home
                </Link>
              </Box>

              <Hero.Title className="p-name">{title}</Hero.Title>
              <Hero.Info>
                <Flex mb={3} wrap>
                  {/*tags.map((tag) => (
                    <Link
                      key={tag.name}
                      href={`/tags/${tag.slug}`}
                      hastag
                      discreet
                    >
                      {tag.name}
                    </Link>
                    ))*/}
                  <Text
                    as="p"
                    size="1"
                    variant="tertiary"
                    weight="3"
                    css={{ marginBottom: 0 }}
                  >
                    {formatDate(date)} / {readingTime} /{' '}
                  </Text>
                </Flex>
                <Flex css={{ marginLeft: '-$2' }}>
                  <Pill variant="info">Last Updated {formatDate(updated)}</Pill>
                </Flex>
              </Hero.Info>

              {image && (
                <Hero.Img className="u-photo" src={image} />
              )}
            </Hero>
            <TableOfContent ids={ids} />
            <Box
              css={{
                padding: '20px 0px',
                gridColumn: '2',
                color: 'var(--laodeaksar-colors-typeface-secondary)',

                h3: {
                  marginTop: '2em'
                },

                section: {
                  marginTop: '5em'
                }
              }}
            >
              {children}
            </Box>
          </Grid>
        </Suspense>
      </article>
    </Layout>
  );
};

export default BlogLayout;
