import React from "react";
import { ButtonProps } from "@mui/material"
import Button from '@mui/material/Button';

type ButtonCustomProps = {
    borderRadius?: number | string,
    backgroundColor?: string
}

export const ButtonCustom = (props: ButtonProps & ButtonCustomProps) => {

    const variant = props.variant ?? 'contained'
    const borderRadius = props.borderRadius ?? 60
    const backgroundColor = props?.backgroundColor ?? '#01004c'

    return (
        <Button variant={variant} {...props} sx={{ borderRadius, px: 5, height: '50px', backgroundColor: backgroundColor }} />
    )
}