import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { Box, Button, TextArea } from '@laodeaksarr/design-system';

import { trpc } from '~/utils/trpc';

function CommentForm({ parentId }: { parentId?: string }) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      body: '',
    },
  });

  const permalink = router.query.permalink as string;

  const utils = trpc.useContext();

  const { isLoading, mutate } = trpc.useMutation(['comments.add-comment'], {
    onSuccess: () => {
      form.reset();

      utils.invalidateQueries(['comments.all-comments', { permalink }]);
    },
  });

  function handleSubmit(values: { body: string }) {
    const payload = {
      ...values,
      permalink,
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
        <Button variant="primary" type="submit">
          {parentId ? 'Post reply' : 'Post Comment'}
        </Button>
      </form>
    </Box>
  );
}

export default CommentForm;
