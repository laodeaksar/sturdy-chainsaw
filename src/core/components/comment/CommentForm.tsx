import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, TextArea } from "@laodeaksarr/design-system";

import { trpc } from "~/utils/trpc";

function CommentForm({ parentId }: { parentId?: string }) {
  const [body, setBody] = useState("");
  const router = useRouter();

  const permalink = router.query.permalink as string;

  const utils = trpc.useContext();

  const { isLoading, mutate } = trpc.useMutation(["comments.add-comment"], {
    onSuccess: () => {
      utils.invalidateQueries(["comments.all-comments", { permalink }]);
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
