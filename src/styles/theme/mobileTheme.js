import {createTheme} from '@mui/material/styles';
import {red, amber} from '@mui/material/colors';

const mobileTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
        warning: {
            main: amber[700],
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {fontSize: '2.5rem', fontWeight: 700},
        h2: {fontSize: '2rem', fontWeight: 600},
        body1: {fontSize: '1rem'},
    },
});

export default mobileTheme;
