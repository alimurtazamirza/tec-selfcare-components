"use client";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {Home, Apps, ShoppingCart, MoreHoriz} from "@mui/icons-material";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function BottomNav() {
    const router = useRouter();
    const [value, setValue] = useState(0);
    return (
        <Paper sx={{position: "fixed", bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
            >
                <BottomNavigationAction label="Home" icon={<Home/>} onClick={() => router.push("/dashboard")}/>
                <BottomNavigationAction label="Marketplace" icon={<ShoppingCart/>} onClick={() => router.push("/marketplace")}/>
                <BottomNavigationAction label="Services" icon={<Apps/>} onClick={() => router.push("/services")}/>
                <BottomNavigationAction label="More" icon={<MoreHoriz/>} onClick={() => router.push("/more")}/>
            </BottomNavigation>
        </Paper>
    );
}
