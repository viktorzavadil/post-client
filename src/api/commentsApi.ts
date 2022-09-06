import Resource from "./resource";
import Comment from "./Comment";

class CommentsApi {

    private resource: Resource;

    constructor() {
        this.resource = new Resource(new URL("https://jsonplaceholder.typicode.com/comments"));
    }

    find(): Promise<Comment[]> {
        return this.resource.find();
    }
}

const commentsApi = new CommentsApi();
export default commentsApi;
