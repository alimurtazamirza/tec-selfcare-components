"use client";

import {
    AppBar,
    Avatar,
    Box, IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import {Notifications} from "@mui/icons-material";

export default function TopNav() {
    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                bgcolor: "#fff",
                color: "#000",
                zIndex: (theme) => theme.zIndex.drawer + 1, // 👈 sidebar se upar
            }}
        >
            <Toolbar>
                <Typography variant="h6" fontWeight="bold">Tec Self-Care PWA</Typography>
                <Box sx={{flexGrow: 1}}/>
                <IconButton edge="start">
                    <Notifications color="primary"/>
                </IconButton>
                <Avatar>A</Avatar>
                <Typography sx={{ml: 1}}>(404) 921-8447</Typography>
            </Toolbar>
        </AppBar>
    );
}
