import { Box, Button, TextArea } from "@laodeaksarr/design-system";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "src/utils/trpc";

function CommentForm({ parentId }: { parentId?: string }) {
  const [body, setBody] = useState("");
  const router = useRouter();

  const slug = router.query.slug as string;

  const utils = trpc.useContext();

  const { isLoading, mutate } = trpc.useMutation(["comments.add-comment"], {
    onSuccess: () => {
      body: "";

      utils.invalidateQueries(["comments.all-comments", { slug }]);
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
      <form onSubmit={() => handleSubmit}>
        <TextArea
          required
          disabled={isLoading}
          placeholder="Comment"
          id="comment"
          aria-label="comment"
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
        />
        <Button variant="primary" type="submit">
          {parentId ? "Post reply" : "Post Comment"}
        </Button>
      </form>
    </Box>
  );
}

export default CommentForm;
