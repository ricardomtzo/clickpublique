
import React, {  } from "react";
import { styled, TextField, TextFieldProps } from "@mui/material";

const TextInputStyled = styled(TextField) ({
    '& .MuiInputBase-input': {
        padding: '5px 5px',
        height: '40px',
        borderRadius: '10px'
    }
})
export default function TextInputCustom(props: TextFieldProps) {


    return (
        <TextInputStyled
            {...props}
            sx={{ my: '10px' }} />
    )
}
