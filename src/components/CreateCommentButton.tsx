import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import React from "react";
import CommentPayload from "../service/CommentPayload";

interface CreateCommentButtonProperties {
    postId: number;
    onCreate: (comment: CommentPayload) => void;
}

interface CreateCommentButtonState {
    open: boolean;
    name?: string;
    email?: string;
    comment?: string;
}

export default class CreateCommentButton extends React.Component<CreateCommentButtonProperties, CreateCommentButtonState> {

    constructor(props: CreateCommentButtonProperties) {
        super(props);

        this.state = {
            open: false
        };
    }

    render() {
        const { open, name, email, comment } = this.state;
        return (
            <Box>
                <Button variant="contained" size="small" onClick={this.openDialog}>Compose comment</Button>
                <Dialog open={open}>
                    <DialogTitle>Compose comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you like to leave a comment?
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={this.onNameChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={this.onEmailChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="comment"
                            label="Comment"
                            type="comment"
                            fullWidth
                            variant="standard"
                            multiline
                            onChange={this.onCommentChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancel}>Cancel</Button>
                        <Button onClick={this.create} disabled={!name || !email || !comment}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }

    private openDialog = () => {
        this.setState({
            open: true
        });
    }

    private onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: event.target.value });
    }

    private onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value });
    }

    private onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ comment: event.target.value });
    }

    private create = () => {
        const { name, email, comment } = this.state;
        this.setState({
            open: false
        });
        if (name && email && comment) {
            this.props.onCreate({ name, email, body: comment });
        } else {
            console.error("Something went wrong");
        }
    }

    private cancel = () => {
        this.setState({
            open: false
        });
    }
}
