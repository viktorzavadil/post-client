import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import CommentEntity from "../api/Comment";
import Identifiable from "../api/Identifiable";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string, sx = {}) {
    return {
        sx: {
            ...sx,
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[ 0 ][ 0 ]}${name.split(' ')[ 1 ][ 0 ]}`,
    };
}

interface CommentProperties {
    comment: CommentEntity,
    onDelete: (comment: Identifiable) => void;
}

export default class Comment extends React.Component<CommentProperties, any> {

    render() {
        const { comment: { name, email, body } } = this.props;
        return (
            <Box>
                <Divider sx={{ marginTop: "8px", marginBottom: "8px" }}/>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Avatar {...stringAvatar(name, {marginRight: "4px"})} variant="rounded"/>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <Typography variant="caption" component="h3">
                            {name}
                        </Typography>
                        <Typography variant="caption" component="h3">
                            {email}
                        </Typography>
                    </Box>
                    <IconButton aria-label="delete" size="small" sx={{ minWidth: "40px" }} onClick={this.deleteComment}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </Box>
                <Typography variant="body2" sx={{ marginTop: "4px" }}>
                    {body}
                </Typography>
            </Box>
        );
    }

    private deleteComment = () => {
        this.props.onDelete(this.props.comment);
    }
}
