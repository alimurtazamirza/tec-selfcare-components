import React from "react";
import {BottomNav, SideBar, TopNav} from "../../ui";
import {Box} from "@mui/material"
import {AppWrapper} from "../../context";

export default function ProtectedLayout({children, serverSession}) {
    return (
        <AppWrapper serverSession={serverSession}>
            <Box sx={{display: {xs: "none", md: "flex"}, bgcolor: "#EEF3F7"}}>
                <TopNav/>
                <Box sx={{display: {xs: "none", md: "block"}}}>
                    <SideBar/>
                </Box>
                <Box width="calc(100% - 280px)" mt="64px">{children}</Box>
            </Box>


            <Box sx={{display: {xs: "block", md: "none"}}}>
                <Box width="100%">{children}</Box>
                <BottomNav/>
            </Box>
        </AppWrapper>
    );
}
