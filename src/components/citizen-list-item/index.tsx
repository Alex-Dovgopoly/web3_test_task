import { useState } from "react";
import { Box, IconButton, Modal, Paper, Typography, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { fetchNoteByCitizenId } from "../../utils/web3/contractUtils";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    cursor: 'pointer'
}));

const ModalBox = styled(Box)(({ theme }) => ({
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#FFF',
    borderRadius: '8px',
    padding: '16px'
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
}));

function CitizenListItem({ itemData }: any) {
    const [citizenNote, setCitizenNote] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCitizenItemClick = async () => {
        const responseNote = await fetchNoteByCitizenId(itemData.id.value);

        if (responseNote) {
            setCitizenNote(responseNote);
        }
        handleOpen();
    };

    return (
        <>
            <Item onClick={handleCitizenItemClick}>
                <Typography>ID: {Number(itemData.id.value)}</Typography>
                <Typography>Name: {itemData.name.value}</Typography>
                <Typography sx={{ overflow: 'hidden' }}>City: {itemData.city.value.hash}</Typography>
                <Typography>Age: {Number(itemData.age.value)}</Typography>
            </Item>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalBox>
                    <CloseButton aria-label="close" onClick={handleClose}>
                        <CloseIcon />
                    </CloseButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        About this citizen
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {citizenNote}
                    </Typography>
                </ModalBox>
            </Modal>
        </>
    )
};

export default CitizenListItem;