import Resource from "./resource";
import Post from "./Post";

class PostsApi {

    private resource: Resource;

    constructor() {
        this.resource = new Resource(new URL("https://jsonplaceholder.typicode.com/posts"));
    }

    find(): Promise<Post[]> {
        return this.resource.find();
    }
}

const postsApi = new PostsApi();
export default postsApi;
