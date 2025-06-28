import { environment } from "@/environments/environment";
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col } from "./Grids";
import { DeleteOutline } from "@mui/icons-material";

const hover = {
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'all 0.3s ease',
    'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

export default function SingleAd({ ad, onDelete }: any) {

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
            <Paper elevation={2} variant="outlined" className="rounded-xl h-[300px] w-[235px] m-auto" style={isHovered ? hover : {}} >
                <Col style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    height: '200px',
                    width: '100%',
                    borderRadius: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                }}>
                    {onDelete && <DeleteOutline className="text-red bg-white p-1 rounded mt-2 ml-2" onClick={(e) => { e.stopPropagation(); onDelete(ad?.id) }} />}

                </Col>
                <Box className="p-2 overflow-hidden mr-3">
                    <Typography className="text-black mb-2 text-[20px] font-semibold">R$ {ad?.price}</Typography>
                    <Typography className="text-black">{ad?.title}</Typography>
                    <Typography variant="body2" className="text-grey " color="text.secondary">{ad?.description}</Typography>
                </Box>
            </Paper>
        </Grid>
    )
}