import { useEffect, useState } from "react";
import { Box, Container, Fab, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { fetchContractLogs } from "../utils/web3/contractUtils";
import CitizenList from "../components/citizen-list";
import CircularLoader from "../components/circular-loader";


function MainPage() {
    const [citizenList, setCitizenList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCitizen();
    }, []);

    const fetchCitizen = async () => {
        const request: any = await fetchContractLogs();

        setCitizenList(request);
    }

    const handleRedirectAddCitizen = () => {
        navigate("/add-citizen");
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Citizen list
                </Typography>
                {citizenList.length
                    ? (<CitizenList citizenListData={citizenList} />)
                    : (<CircularLoader />)
                }
            </Box>
            <Fab onClick={handleRedirectAddCitizen} color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
                <AddIcon />
            </Fab>
        </Container>
    )
};

export default MainPage;