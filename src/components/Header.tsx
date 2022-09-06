import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static" className="header">
            <Toolbar>
                <Typography variant="h5" component="h1">
                    Post Client
                </Typography>
            </Toolbar>
        </AppBar>)
}
