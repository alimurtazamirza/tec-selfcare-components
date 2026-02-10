"use client";

import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {mobileTheme, webTheme} from "@/styles";
import {Box} from "@mui/material";

export default function ThemeWrapper({children}) {

    return (
        <ThemeProvider theme={webTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>)
}
