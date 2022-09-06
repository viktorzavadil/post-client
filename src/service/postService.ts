import Post from "../api/Post";
import postsApi from "../api/postsApi";

class PostService {

    private posts: Post[] | undefined;

    async count() {
        await this.initializePosts();
        return (this.posts || []).length;
    }

    async find(limit: number, offset: number) {
        await this.initializePosts();
        return (this.posts || []).slice(offset, offset + limit);
    }

    private async initializePosts() {
        if (!this.posts) {
            this.posts = await postsApi.find() || [];
        }
    }
}

const postService = new PostService();
export default postService;
