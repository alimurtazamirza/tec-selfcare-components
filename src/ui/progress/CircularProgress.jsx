// javascript
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressCP({ title, value, total, postFix, ...restProps }) {
    const percent = total ? (value / total) * 100 : 0;

    return (
        <>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{title}</Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={percent} {...restProps} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 400, mt: 0 }}>
                        {postFix}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}