
import { Box, CircularProgress } from '@mui/material';

export function Loading({color= '#038C8C', size=50}){
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress
                sx={{
                    color: color
                }}
                size={size}
            />
        </Box>
    );
}