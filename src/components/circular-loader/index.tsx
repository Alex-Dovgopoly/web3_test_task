import { Box, CircularProgress } from "@mui/material";

function CircularLoader() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
};

export default CircularLoader;