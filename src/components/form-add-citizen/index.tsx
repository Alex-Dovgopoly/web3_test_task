import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, Backdrop, Box, Button, CircularProgress } from "@mui/material";
import FormTextField from "../form-components/text-field";
import FormNumberField from "../form-components/number-field";
import { createNewCitizen } from "../../utils/web3/contractUtils";
import ConfirmModal from "../confirm-modal";


// Define a schema for validation
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup
        .number()
        .typeError("Age must be a number")
        .required("Age is required")
        .min(18, "Age should be greater than or equal to 18")
        .max(150, "Age should be less than or equal to 150"),
    city: yup.string().required("City is required"),
    note: yup.string().required("Note is required"),
});

export type IFormInput = yup.InferType<typeof schema>;

const defaultValues = {
    name: "",
    age: 18,
    city: "",
    note: "",
};

function AddCitizenForm() {
    const [isAccountAlert, setIsAccountAlert] = useState(false);
    const [isCheckTransaction, setIsCheckTransaction] = useState(false);
    const [isAccessModal, setIsAccessModal] = useState(false);
    const { account, library } = useWeb3React();

    const { handleSubmit, reset, control } = useForm<IFormInput>({ resolver: yupResolver(schema), defaultValues });

    const onSubmit = async (data: IFormInput) => {
        // Check is account exist
        if (!account) {
            displayLoginAlarm();
            return;
        }

        const signer = library.getSigner(account);

        setIsCheckTransaction(true);
        await createNewCitizen(data, signer);
        setIsCheckTransaction(false);
        showAccessModal();

        reset();

    };

    function displayLoginAlarm() {
        setIsAccountAlert(true);

        setTimeout(() => {
            setIsAccountAlert(false);
        }, 5000)
    }

    function showAccessModal() {
        setIsAccessModal(true);
    };

    function closeAccessModal() {
        setIsAccessModal(false);
    }


    return (
        <Box component="form" display="flex" flexDirection="column" justifyContent="center" py={5} gap={3} maxWidth="400px" margin="auto">
            {isAccountAlert && (
                <Alert severity="warning">You need login for submit this form</Alert>
            )}
            <FormTextField
                name={"name"}
                control={control}
                label={"Name"}
            />
            <FormNumberField
                name="age"
                control={control}
                label={"Age"}
            />
            <FormTextField
                name={"city"}
                control={control}
                label={"City"}
            />
            <FormTextField
                name={"note"}
                control={control}
                label={"Some Note"}
            />
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                Submit
            </Button>
            <Button onClick={() => reset()} variant={"outlined"}>
                Reset
            </Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isCheckTransaction}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ConfirmModal open={isAccessModal} handleClose={closeAccessModal} />
        </Box>
    )
};

export default AddCitizenForm;