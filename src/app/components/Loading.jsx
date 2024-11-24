import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <CircularProgress size={60} color="secondary" />
        </Box>
    );
}

function CircularIndeterminate() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress size={20} color="secondary" />
        </Box>
    );
}

export { Loading, CircularIndeterminate };