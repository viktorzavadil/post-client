import React from "react";
import Post from "../components/Post";
import PostEntity from "../api/Post";
import { Box, Container, Pagination } from "@mui/material";
import postService from "../service/postService";

interface PostsContainerProperties {
}

interface PostsContainerState {
    count: number;
    offset: number;
    posts?: PostEntity[];
}

export default class PostsContainer extends React.Component<PostsContainerProperties, PostsContainerState> {

    private static readonly LIMIT = 3;

    constructor(props: PostsContainerProperties) {
        super(props);

        this.state = {
            offset: 0,
            count: 0
        };
    }

    async componentDidMount() {
        const { offset } = this.state;
        const count = await postService.count();
        const posts = await postService.find(PostsContainer.LIMIT, offset);
        this.setState({
            count, posts
        });
    }

    render() {
        const { count, offset, posts } = this.state;
        const pages = Math.ceil(count / PostsContainer.LIMIT);
        const page = Math.floor(offset / PostsContainer.LIMIT) + 1;
        return (
            <Container maxWidth="sm">
                {posts?.map((post) => <Post key={post.id} post={post}/>)}
                <Box sx={{ margin: "16px 0", display: "flex", justifyContent: "center" }}>
                    <Pagination count={pages} page={page} onChange={this.onPaginationChange} variant="outlined"
                                shape="rounded"/>
                </Box>
            </Container>
        );
    }

    private onPaginationChange = async (event: React.ChangeEvent<unknown>, page: number) => {
        const offset = PostsContainer.LIMIT * (page - 1);
        const posts = await postService.find(PostsContainer.LIMIT, offset);
        this.setState({
            offset, posts
        });
        console.debug(`[${PostsContainer.name}] ${posts.map((post) => post.id)} posts shown`);
    }
}
