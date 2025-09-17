import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

type Props = TextFieldProps & { name: string };

export function FormikTextField({ name, helperText, ...props }: Props) {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <TextField
      {...field}
      {...props}
      sx={{
        width: "100%",
        "& .MuiInputBase-input, & .MuiInputLabel-root, & .MuiTypography-root": {
          color: "white",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ffffff40",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ffffffca !important",
        },
        "& input[type=number]": {
          appearance: "textfield",
          MozAppearance: "textfield",
        },
        "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
          {
            WebkitAppearance: "none",
            margin: 0,
          },
        ...props.sx,
      }}
      value={field.value ?? ""}
      error={isError}
      helperText={isError ? meta.error : helperText}
      onChange={(e) => {
        field.onChange(e);
        props.onChange?.(e);
      }}
      onBlur={(e) => {
        field.onBlur(e);
        props.onBlur?.(e);
      }}
    />
  );
}
