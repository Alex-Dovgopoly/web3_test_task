import { Box, IconButton, Modal, Typography, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const ModalBox = styled(Box)(({ theme }) => ({
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '410px',
    maxWidth: '100vw',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    padding: '16px'
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
}));

type PropTypes = {
    open: boolean;
    handleClose: () => void;
}

function ConfirmModal({ open, handleClose }: PropTypes) {
    return (
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
                <Typography id="modal-modal-title" variant="h1" component="h2" align="center" fontSize="2rem" fontWeight={500}>
                    Transaction complete
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#AFE1AF",
                        borderRadius: "50%",
                        width: "150px",
                        height: "150px",
                        margin: '40px auto'
                    }}
                >
                    <DoneIcon sx={{ color: "#097969", fontSize: "65px", margin: 'auto' }} />
                </Box>
            </ModalBox>
        </Modal>
    )
};

export default ConfirmModal;