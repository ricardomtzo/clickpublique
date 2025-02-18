'use client';
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";
import image1 from "../app/assets/imgs/image1.webp";
import image2 from "../app/assets/imgs/image2.jpeg";
import image3 from "../app/assets/imgs/image3.jpeg";
import image4 from "../app/assets/imgs/image4.jpeg";
import image5 from "../app/assets/imgs/image5.jpeg";
import image6 from "../app/assets/imgs/image6.webp";

const images = [image1, image2, image3, image4, image5, image6, image1, image2, image3, image1];
export default function ProductsList() {
    return (

        <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            alignItems={'center'} mt={2} >
            {images.map((image, index) => (
                <Grid key={index} mb={2}>
                    <Paper elevation={2} variant="outlined" className="rounded-xl h-[250px] w-[220px] m-auto" >
                        <img
                            src={image.src}
                            alt="Logo"
                            width={'100%'}
                            height={150}
                            style={{ maxHeight: 150, minHeight: 150, objectFit: 'cover', borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />

                        <Box className="p-2">
                            <Typography className="text-black mb-2">R$ 850,00</Typography>
                            <Typography className="text-black">Nome do item</Typography>
                            <Typography variant="body2" className="text-grey" color="text.secondary">Descrição do item</Typography>

                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>

    );
}
