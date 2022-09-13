import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Box, Button, Icon, TextInput } from '@laodeaksarr/design-system';

import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import { useForm } from '@mantine/form';

import { trpc } from '~/utils/trpc';

const MarkdownEditor = dynamic(
  () => import('@uiw/react-markdown-editor').then(mod => mod.default),
  { ssr: false }
);

function CreatePostPage() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: '',
      body: '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>',
    },
  });

  const { isLoading, mutate } = trpc.useMutation(['posts.create-post'], {
    onSuccess(post) {
      router.push(`/posts/${post.slug}`);
    },
  });

  async function handleSubmit(values: { title: string; body: string }) {
    const { title, body } = values;

    mutate({
      title,
      body,
    });
  }

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          id="title"
          label="Title"
          aria-label="Title"
          placeholder="Your post title"
          {...form.getInputProps('title')}
        />

        <MarkdownEditor
          value="<p>Your initial <b>html value</b> or an empty string to init editor without value</p>"
          onChange={value => {
            form.setFieldValue('body', value);
          }}
        />
        <Button
          aria-label="Send message"
          isLoading={isLoading}
          variant="primary"
          type="submit"
        >
          Create post
        </Button>
      </form>
    </Box>
  );
}

export default CreatePostPage;
