import Comment from "../api/Comment";

export default interface CommentPayload extends Omit<Comment, "postId" | "id"> {
}
