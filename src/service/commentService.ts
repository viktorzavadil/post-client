import Comment from "../api/Comment";
import commentsApi from "../api/commentsApi";
import CommentPayload from "./CommentPayload";

class CommentService {

    private comments: Comment[] | undefined;

    async find(postId: number) {
        await this.initializeComments();
        return (this.comments || []).filter((comment) => comment.postId === postId);
    }

    async create(postId: number, payload: CommentPayload) {
        await this.initializeComments();
        if (this.comments) {
            this.comments.push({ postId, ...payload, id: this.comments.length + 1 });
        }
    }

    async delete(id: number) {
        await this.initializeComments();
        if (this.comments) {
            this.comments = this.comments.filter((comment) => comment.id !== id);
        }
    }

    private async initializeComments() {
        if (!this.comments) {
            this.comments = await commentsApi.find() || [];
        }
    }
}

const commentService = new CommentService();
export default commentService;
