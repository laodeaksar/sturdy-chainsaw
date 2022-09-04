import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Button, TextInput } from "@laodeaksarr/design-system";

import { trpc } from "~/utils/trpc";

function CreatePostPage() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      body: "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>",
    },
  });

  const { isLoading, mutate } = trpc.useMutation(["posts.create-post"], {
    onSuccess(post) {
      /*updateNotification({
        id: "creating-post",
        color: "teal",
        title: "Post created",
        message: "Post created successfully",
        icon: <CheckIcon />,
        autoClose: 2000,
      });*/
      router.push(`/posts/${post.permalink}`);
    },
  });

  async function handleSubmit(values: { title: string; body: string }) {
    /*showNotification({
      id: "creating-post",
      loading: true,
      title: "Creating posts",
      message: "You will be redirected when your post has been created",
      autoClose: false,
      disallowClose: true,
    });*/

    const { title, body } = values;

    mutate({
      title,
      body,
    });
  }

  return (
    <Box>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <TextInput
          required
          id="title"
          label="Title"
          aria-label="Title"
          placeholder="Your post title"
          {...form.register("title")}
          onChange={() => {}}
        />

        {/*<RichText
            value="<p>Your initial <b>html value</b> or an empty string to init editor without value</p>"
            onChange={(value) => {
              form.setFieldValue("body", value);
            }}
        />*/}
        <Button variant="primary" /*isLoading={isLoading}*/ type="submit">
          Create post
        </Button>
      </form>
    </Box>
  );
}

export default CreatePostPage;
