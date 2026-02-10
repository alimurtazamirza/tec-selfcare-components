"use client";

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import {ShoppingCart} from "@mui/icons-material";
import {clearSessionServer} from "../../lib";
import {redirect} from "next/navigation";

const drawerWidth = 280;

export function SideBar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRight: "1px solid #E5E7EB",
                    mt: "64px",
                    height: "calc(100% - 64px)",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            {/* Top Menu */}
            <List>
                {[{name: "Dashboard", url: "/dashboard"},
                    {name: "Marketplace", url: "/marketplace"},
                    {name: "Usage History", url: "/usage-history"},
                    {name: "Plans", url: "/plans"}].map(
                    (menu, i) => (
                        <ListItem sx={{cursor: "pointer"}} key={menu.name + i} onClick={() => {
                            redirect(menu.url)
                        }}>
                            <ListItemIcon>
                                {i === 0 && <DashboardIcon color="secondary"/>}
                                {i === 1 && <ShoppingCart color="secondary"/>}
                                {i === 2 && <HistoryIcon color="secondary"/>}
                                {i >= 3 && <LocalOfferIcon color="secondary"/>}
                            </ListItemIcon>
                            <ListItemText primary={menu.name}/>
                        </ListItem>
                    )
                )}
            </List>

            <Box sx={{flexGrow: 1}}/>

            {/* Logout Bottom */}
            <List>
                <ListItem
                    sx={{background: "#FEE2E2", cursor: "pointer"}}
                    onClick={async () => {
                        await clearSessionServer();
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItem>
            </List>
        </Drawer>
    );
}
