'use client';
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";

import image1 from "../assets/imgs/image1.webp";
import image2 from "../assets/imgs/image2.jpeg";
import image3 from "../assets/imgs/image3.jpeg";
import image4 from "../assets/imgs/image4.jpeg";
import image5 from "../assets/imgs/image5.jpeg";
import image6 from "../assets/imgs/image6.webp";

import FiltroLateral from "@/components/Filter";
import { LocationOnOutlined } from "@mui/icons-material";

const images = [image1, image2, image3, image4, image5, image6, image1, image2, image3, image1];

const hover = {
  backgroundColor: 'transparent',
  borderRadius: 10,
  cursor: 'pointer',
  ":hover": {
    transform: 'scale(1.1)',
    transition: 'all 0.3s ease',
    'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }
}

export default function Home() {

  const onSelect = () => {
    window.location.href = `/item`
  }

  return (
    <div>
      <Grid
        mt={2}
        container
        size={{ xs: 4, md: 4 }}
        spacing={{ xs: 1, md: 1 }}
      >

        <FiltroLateral />

        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          size={{ xs: 8, md: 8 }} mt={2} pl={3}
          sx={{ borderLeft: '1px solid lightgrey' }}>
          {images.map((image, index) => (
            <Grid key={index} mb={2} size={{ xs: 12, md: 12,}} sx={hover} onClick={onSelect}>
              <Paper elevation={2} variant="outlined" className="rounded-xl h-[200px] w-[100%] m-auto" >
                <Grid container spacing={1}>
                  <Grid size={{ xs: 4, md: 4 }}>
                    <img
                      src={image.src}
                      alt="Logo"
                      style={{ objectFit: 'cover', height: 200, width: '250px', borderRadius: 10, borderBottomRightRadius: 0, borderTopRightRadius: 0 }} />
                  </Grid>
                  <Grid className="p-2 h-[200px]" size={{ xs: 8, md: 8 }}>
                    <Typography className="text-black mt-5">Nome do item</Typography>
                    <Typography variant="body2" className="text-grey mt-5" color="text.secondary">Descrição do item</Typography>
                    <Box className="mt-[65px]" />
                    <Typography
                      variant="body2"
                      className="mt-5 text-[grey]">
                      <LocationOnOutlined fontSize="small" /> São Paulo | SP
                      <span className="text-bold text-black mb-2 float-right mr-3 text-[16px]">R$ 850,00</span>
                    </Typography>

                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Grid>
    </div>
  );
}
