import {createTheme} from "@mui/material/styles";
import {red, amber} from "@mui/material/colors";

const webTheme = createTheme({
    palette: {
        primary: {
            main: "#1E3A8A",
            contrastText: "#ffffff",
        },
        success: {main: "#2E8B57"},
        secondary: {
            main: "#183038",
        },
        warning: {
            main: amber[700],
        },
        error: {
            main: red[200],
        },
        background: {
            default: "rgb(231 239 244)",
        },
    },

    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: {fontSize: "2.5rem", fontWeight: 700},
        h2: {fontSize: "2rem", fontWeight: 600},
        body1: {fontSize: "1rem"},
    },

    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    "& a": {
                        color: "#2E8B57",
                        textDecoration: "none",
                        fontWeight: 600,

                        "&:hover": {
                            // textDecoration: "none",
                            cursor: "pointer",
                            color: "#246B45",
                        },
                    },
                },
            },
        },
    },
});

export default webTheme;
