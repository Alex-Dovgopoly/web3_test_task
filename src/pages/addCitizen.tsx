import { Box, Container, Typography } from "@mui/material";
import AddCitizenForm from "../components/form-add-citizen";

function AddCitizen() {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Add new Citizen
                </Typography>
                <AddCitizenForm />
            </Box>
        </Container>
    )
};

export default AddCitizen;