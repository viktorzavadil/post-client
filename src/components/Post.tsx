import { Alert, Box, Card, Snackbar, Typography } from "@mui/material";
import React from "react";
import CreateCommentButton from "./CreateCommentButton";
import PostEntity from "../api/Post";
import commentService from "../service/commentService";
import CommentEntity from "../api/Comment";
import Comment from "./Comment";
import Identifiable from "../api/Identifiable";
import CommentPayload from "../service/CommentPayload";

interface PostProperties {
    post: PostEntity;
}

interface PostState {
    comments?: CommentEntity[];
    openCommentDeletedInfo: boolean;
    openCommentCreatedInfo: boolean;
}

export default class Post extends React.Component<PostProperties, PostState> {

    constructor(props: PostProperties) {
        super(props);

        this.state = {
            openCommentDeletedInfo: false,
            openCommentCreatedInfo: false
        };
    }

    async componentDidMount() {
        await this.refreshComments();
    }

    render() {
        const { post: { title, body, id } } = this.props;
        const { comments, openCommentDeletedInfo, openCommentCreatedInfo } = this.state;
        return (
            <Box sx={{ mt: "16px" }}>
                <Card variant="outlined">
                    <Box sx={{ padding: "16px" }}>
                        <Typography variant="subtitle1" component="h2" sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2">
                            {body}
                        </Typography>
                        {comments?.length ? <Typography variant="subtitle2" component="h3" sx={{ marginTop: "16px" }}>
                            Comments
                        </Typography> : ""}
                        {comments?.map((comment) => <Comment key={comment.id} comment={comment}
                                                             onDelete={this.onCommentDelete}/>)}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                            <CreateCommentButton postId={id} onCreate={this.onCommentCreate}/>
                        </Box>
                    </Box>
                </Card>
                <Snackbar open={openCommentDeletedInfo} autoHideDuration={6000}
                          onClose={this.closeCommentDeletedInfo}>
                    <Alert onClose={this.closeCommentDeletedInfo} severity="warning" sx={{ width: '100%' }}>
                        Comment deleted.
                    </Alert>
                </Snackbar>
                <Snackbar open={openCommentCreatedInfo} autoHideDuration={6000} onClose={this.closeCommentCreatedInfo}>
                    <Alert onClose={this.closeCommentCreatedInfo} severity="success" sx={{ width: '100%' }}>
                        Comment successfully created.
                    </Alert>
                </Snackbar>
            </Box>
        );
    }

    private onCommentDelete = async (comment: Identifiable) => {
        await commentService.delete(comment.id);
        await this.refreshComments();
        this.setState({ openCommentDeletedInfo: true });
    }

    private onCommentCreate = async (comment: CommentPayload) => {
        await commentService.create(this.props.post.id, comment);
        await this.refreshComments();
        this.setState({ openCommentCreatedInfo: true });
    }

    private async refreshComments() {
        const comments = await commentService.find(this.props.post.id);
        this.setState({
            comments
        });
    }

    private closeCommentDeletedInfo = () => {
        this.setState({
            openCommentDeletedInfo: false
        });
    }

    private closeCommentCreatedInfo = () => {
        this.setState({
            openCommentCreatedInfo: false
        });
    }
}
