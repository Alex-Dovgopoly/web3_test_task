import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormInputProps {
    name: string,
    control: any,
    label: string,
}

function FormNumberField({ name, control, label }: FormInputProps) {
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
                    type="number"
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
            )}
        />
    )
};

export default FormNumberField;