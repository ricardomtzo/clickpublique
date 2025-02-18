import { Box, Typography } from "@mui/material";

export default function LineSpace({ margin, width, text }: any) {

    return (
        <Box
            width={width ? width : '80%'}
            margin={margin ? margin : 'auto'}
            className="h-[20px] border-t-1 border-solid mb-5 " sx={{ borderTop: '1px solid lightgrey' }}
        >
            <Typography variant="h6" className="text-grey mt-2" color="text.secondary">
                {text}
            </Typography>
        </Box>
    )

}