import { useRouter } from 'next/router';
import { Box, Button, TextArea } from '@laodeaksarr/design-system';
import { useForm } from '@mantine/form';

import { trpc } from '~/utils/trpc';

function CommentForm({ parentId }: { parentId?: string }) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      body: '',
    },
  });

  const slug = router.query.slug as string;

  const utils = trpc.useContext();

  const { isLoading, mutate } = trpc.useMutation(['comments.add-comment'], {
    onSuccess: () => {
      form.reset();

      utils.invalidateQueries([
        'comments.all-comments',
        {
          slug,
        },
      ]);
    },
  });

  function handleSubmit(values: { body: string }) {
    const payload = {
      ...values,
      slug,
      parentId,
    };

    return mutate(payload);
  }

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextArea
          required
          id="comment"
          disabled={isLoading}
          placeholder="Comment"
          aria-label="comment"
          {...form.getInputProps('body')}
        />
        <Button isLoading={isLoading} variant="primary" type="submit">
          {parentId ? 'Post reply' : 'Post Comment'}
        </Button>
      </form>
    </Box>
  );
}

export default CommentForm;
