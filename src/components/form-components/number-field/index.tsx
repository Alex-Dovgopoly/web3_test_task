import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { IFormInput } from "../../form-add-citizen";

interface FormInputProps {
    name: any;
    control: Control<IFormInput>;
    label: string;
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
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', }}
                />
            )}
        />
    )
};

export default FormNumberField;