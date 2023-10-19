import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormInputProps {
    name: string,
    control: any,
    label: string,
}

function FormTextField({ name, control, label }: FormInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    required
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                />
            )}
        />
    )
};

export default FormTextField;