"use client";

import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItemText,
    Box,
    Collapse,
    ListItemButton,
    ListItemIcon,
    useTheme,
} from "@mui/material";
import * as MUIIcons from "@mui/icons-material";
import {
    ExpandLess,
    ExpandMore,
    Logout as LogoutIcon,
    Home
} from "@mui/icons-material";
import { clearSessionServer } from "@/lib";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/context";

const drawerWidth = 280;

export function SideBar() {
    const { session } = useAppContext();
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    // State to track which menu is open.
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index, url, hasSubmenu) => {
        if (hasSubmenu) {
            setOpenIndex(openIndex === index ? null : index);
        } else {
            router.push(url);
        }
    };

    // Filter to only show Active items
    const activeMenus = session?.menu?.filter(item => item?.status === "Active") || [];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRight: `1px solid ${theme.palette.divider}`,
                    mt: "64px",
                    height: "calc(100% - 64px)",
                    backgroundColor: theme.palette.background.paper,
                },
            }}
        >
            <List sx={{ px: 1.5, py: 2 }}>
                {activeMenus.map((menu, i) => {
                    const hasSubmenu = menu?.items && menu?.items.length > 0;
                    const isOpen = openIndex === i;
                    const isActive = pathname === menu?.identifier;
                    const IconComponent = MUIIcons[menu?.icon] || Home;

                    return (
                        <React.Fragment key={menu?.title + i}>
                            <ListItemButton
                                onClick={() => handleToggle(i, menu?.identifier, hasSubmenu)}
                                selected={isActive}
                                sx={{
                                    borderRadius: "10px",
                                    mb: 0.5,
                                    transition: "all 0.2s ease",
                                    // Active State Styling
                                    "&.Mui-selected": {
                                        backgroundColor: theme.palette.primary.main,
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: theme.palette.primary.light,
                                        },
                                        "& .MuiListItemIcon-root": {
                                            color: "white",
                                        },
                                    },
                                    // Hover State
                                    "&:hover": {
                                        backgroundColor: theme.palette.action.hover,
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 38 }}>
                                    <IconComponent sx={{ fontSize: 22 }} />
                                </ListItemIcon>

                                <ListItemText
                                    primary={menu?.title}
                                    slotProps={{
                                        primary: {
                                            fontSize: theme.typography.body1.fontSize,
                                            fontWeight: isActive || isOpen ? 600 : 500,
                                            fontFamily: theme.typography.fontFamily
                                        }
                                    }}
                                />
                                {hasSubmenu ? (isOpen ? <ExpandLess /> : <ExpandMore />) : null}
                            </ListItemButton>

                            {/* Submenu Logic */}
                            {hasSubmenu && (
                                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {menu.items.map((sub) => {
                                            const isSubActive = pathname === sub.identifier;
                                            return (
                                                <ListItemButton
                                                    key={sub.title}
                                                    selected={isSubActive}
                                                    sx={{
                                                        pl: 6,
                                                        borderRadius: "8px",
                                                        "&.Mui-selected": {
                                                            backgroundColor: "transparent",
                                                            color: theme.palette.primary.main,
                                                            "& .MuiTypography-root": { fontWeight: 700 }
                                                        }
                                                    }}
                                                    onClick={() => router.push(sub.identifier)}
                                                >
                                                    <ListItemText
                                                        primary={sub.title}
                                                        slotProps={{
                                                            primary: {
                                                                fontSize: theme.typography.body2.fontSize,
                                                                fontFamily: theme.typography.fontFamily
                                                            }
                                                        }}
                                                    />
                                                </ListItemButton>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    );
                })}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            {/* Logout Section */}
            <List sx={{ p: 1.5 }}>
                <ListItemButton
                    sx={{
                        background: theme.palette.error.light,
                        color: theme.palette.error.contrastText,
                        borderRadius: "10px",
                        "&:hover": {
                            background: theme.palette.error.main,
                            opacity: 0.9
                        },
                    }}
                    onClick={async () => {
                        await clearSessionServer();
                    }}
                >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </Drawer>
    );
}