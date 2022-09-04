import { useRouter } from 'next/router';
import { Box, Button, TextArea } from '@laodeaksarr/design-system';

import { trpc } from '~/utils/trpc';
import { useForm } from 'react-hook-form';

function CommentForm({ parentId }: { parentId?: string }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      body: ''
    }
  });

  const permalink = router.query.permalink as string;

  const utils = trpc.useContext();

  const { isLoading, mutate } = trpc.useMutation(['comments.add-comment'], {
    onSuccess: () => {
      utils.invalidateQueries(['comments.all-comments', { permalink }]);
    }
  });

  function handleSubmit(values: { body: string }) {
    const payload = {
      ...values,
      permalink,
      parentId
    };

    return mutate(payload);
  }

  return (
    <Box>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <TextArea
          required
          id="comment"
          disabled={isLoading}
          placeholder="Comment"
          aria-label="comment"
          {...form.register('body')}
        />
        <Button variant="primary" type="submit">
          {parentId ? 'Post reply' : 'Post Comment'}
        </Button>
      </form>
    </Box>
  );
}

export default CommentForm;
