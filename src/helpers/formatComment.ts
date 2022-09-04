import type { Comment, CommentWithChildren } from "~/utils/trpc";

function formComments(comments: Comment[]) {
  const map = new Map();

  const roots: CommentWithChildren[] = [];

  for (let i = 0; i < comments.length; i++) {
    const commentId = comments[i]?.id;

    map.set(commentId, i);

    (comments[i] as CommentWithChildren).children = [];

    if ((comments[i] as CommentWithChildren).parentId) {
      const parentCommentIndex: number = map.get(comments[i]?.parentId);

      {
        (comments[parentCommentIndex] as CommentWithChildren).children.push(
          comments[i] as CommentWithChildren
        );
      }

      continue;
    }

    roots.push(comments[i] as CommentWithChildren);
  }

  return roots;
}

export default formComments;
