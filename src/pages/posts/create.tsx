import { useRouter } from 'next/router';
import { Box, Icon, TextInput } from '@laodeaksarr/design-system';

import { useForm } from '@mantine/form';
import { Button } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

import { trpc } from '~/utils/trpc';

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
      updateNotification({
        id: 'creating-post',
        color: 'teal',
        title: 'Post created',
        message: 'Post created successfully',
        icon: <IconCheck />,
        autoClose: 2000,
      });
      router.push(`/posts/${post.permalink}`);
    },
  });

  async function handleSubmit(values: { title: string; body: string }) {
    showNotification({
      id: 'creating-post',
      loading: true,
      title: 'Creating posts',
      message: 'You will be redirected when your post has been created',
      autoClose: false,
      disallowClose: true,
    });

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

        {/*<RichText
            value="<p>Your initial <b>html value</b> or an empty string to init editor without value</p>"
            onChange={(value) => {
              form.setFieldValue("body", value);
            }}
          />*/}
        <Button loading={isLoading} type="submit">
          Create post
        </Button>
      </form>
    </Box>
  );
}

export default CreatePostPage;
