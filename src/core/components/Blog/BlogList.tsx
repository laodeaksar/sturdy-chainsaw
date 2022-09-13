import { Flex, Pill, Text } from '@laodeaksarr/design-system';

import useIsArticleRead from '~/theme/hooks/useIsArticleRead';

import { handleArticleClicked } from '~/lib/handleArticleClicked';
import type { Post } from '~/lib/types';

import { Block, Button } from './Styles';

export function BlogList({ post }: { post: Post }) {
  const { createdAt, slug, title } = post;

  const [hasRead] = useIsArticleRead(slug);

  return (
    <Button onClick={() => handleArticleClicked(slug)}>
      <Block>
        <Text
          as="p"
          size="1"
          variant="tertiary"
          weight="3"
          css={{
            minWidth: '52px',
            marginRight: '32px',
            marginBottom: 0,
          }}
        >
          {new Date(createdAt).toLocaleDateString('en', {
            year: '2-digit',
            month: 'short',
          })}
        </Text>
        <Text
          as="p"
          truncate
          css={{
            textAlign: 'left',
            marginBottom: 0,
            maxWidth: '12rem',

            '@md': {
              maxWidth: '$full',
            },
          }}
        >
          {title}
        </Text>
        {hasRead && (
          <Flex ml="auto">
            <Pill variant="success" css={{ marginRight: '$3' }}>
              read
            </Pill>
          </Flex>
        )}
      </Block>
    </Button>
  );
}
