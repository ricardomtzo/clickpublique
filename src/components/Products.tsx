'use client';
import { useEffect, useState } from "react";
import { environment } from "@/environments/environment";
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";

export default function ProductsList({ ads }: any) {

    const [adsList, setAdsList] = useState<any>([]);

    useEffect(() => {
        setAdsList(ads);
    }, [ads]);

    return (

        <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            alignItems={'center'} mt={2} >
            {adsList?.map((ad: any, index: number) => {

                const img = `${environment.storageUrl}/${ad?.files?.[0]?.path}` || '';
                return (
                    <Grid key={index} mb={2}>
                        <Paper elevation={2} variant="outlined" className="rounded-xl h-[250px] w-[220px] m-auto" >
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
            })}
        </Grid>

    );
}
