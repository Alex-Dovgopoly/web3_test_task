import { Alert, Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import FormTextField from "../form-components/text-field";
import FormNumberField from "../form-components/number-field";
import { createNewCitizen } from "../../utils/web3/contractUtils";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

interface IFormInput {
    name: string;
    age: number;
    city: string;
    note: string;
}
const defaultValues = {
    name: "",
    age: 18,
    city: "",
    note: "",
};

function AddCitizenForm() {
    const [isAccountAlert, setIsAccountAlert] = useState(false);
    const [isCheckTransaction, setIsCheckTransaction] = useState(false);
    const { account, library } = useWeb3React();

    const { handleSubmit, reset, control } = useForm<IFormInput>({
        defaultValues: defaultValues,
    });

    const onSubmit = async (data: IFormInput) => {
        // Check is account exist
        if (!account) {
            setIsAccountAlert(true);

            setTimeout(() => {
                setIsAccountAlert(false);
            }, 5000)

            return;
        }

        const signer = library.getSigner(account);

        setIsCheckTransaction(true);
        const res = await createNewCitizen(data, signer);
        console.log('Component res: ', res);
        setIsCheckTransaction(false);

        reset();

    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" py={5} gap={3} maxWidth="400px" margin="auto">
            {isAccountAlert && (
                <Alert severity="warning">You need login for submit this form</Alert>
            )}
            <FormTextField
                name={"name"}
                control={control}
                label={"Name"}
            />
            <FormNumberField
                name={"age"}
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
        </Box>
    )
};

export default AddCitizenForm;