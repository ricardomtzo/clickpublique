import { environment } from "@/environments/environment";
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const hover = {
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'all 0.3s ease',
    'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

export default function SingleAd({ ad }: any) {

    const route = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const onSelect = () => {
        route.push(`/item?ad=${ad?.id}`);
    }

    const img = `${environment.storageUrl}/${ad?.files?.[0]?.path}` || '';

    return (
        <Grid
            mb={2}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSelect}>
            <Paper elevation={2} variant="outlined" className="rounded-xl h-[250px] w-[220px] m-auto" style={isHovered ? hover : {}} >
                <img
                    src={img}
                    alt="Logo"
                    width={'100%'}
                    height={150}
                    style={{ maxHeight: 150, minHeight: 150, objectFit: 'cover', borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />

                <Box className="p-2">
                    <Typography className="text-black mb-2">R$ {ad?.price}</Typography>
                    <Typography className="text-black">{ad?.title}</Typography>
                    <Typography variant="body2" className="text-grey" color="text.secondary">{ad?.description}</Typography>
                </Box>
            </Paper>
        </Grid>
    )
}