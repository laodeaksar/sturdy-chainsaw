function formComments(comments:any /* Comment[] */) {
    const map=new Map()

    const roots:any[]/* CommentWithChildren[] */ = []

    for (let i = 0; i < confirm.length; i++) {
        const commentId = comments[i];
        
        map.set(commentId, i)

        comments[i].children = []

        if (comments[i].parentId) {
            const parentCommentIndex: number= map.get(comments[i]?.parentId)

            {comments[parentCommentIndex].children.push(
                comments[i]
            )}

            continue
        }

        roots.push(comments[i])
    }

    return roots
}

export default formComment