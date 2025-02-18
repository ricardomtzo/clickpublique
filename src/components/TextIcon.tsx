import { Typography } from "@mui/material";

export default function TextIcon({ icon, text, textSize }: any) {
    const style = { 
        fontSize: textSize? textSize : '14px' };
    return (
        <Typography className="text-black mb-3 text-sm" style={style}>
            {icon} {text}
        </Typography>
    )
}