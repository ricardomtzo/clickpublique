'use client';
import { useEffect, useState } from "react";
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";
import anuncio from "../assets/imgs/anuncio.jpeg";

import SingleAd from "@/components/SingleAd";
import { environment } from "@/environments/environment";
import adsService from "@/services/AdsService";
import categoryService from "@/services/CategorieService";

const hover = {
  cursor: 'pointer',
  borderRadius: 200,
  ":hover": {
    transform: 'scale(1.1)',
    transition: 'all 0.3s ease',
    'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }
}

const onSelect = () => {
  window.location.href = `/pesquisa`
}

export default function Home() {

  const [categories, setCategories] = useState<any>([]);
  const [ads, setAds] = useState<any>([]);

  useEffect(() => {
    getCategories();
    getAds();
  }, []);

  const getCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const getAds = async () => {
    try {
      const response = await adsService.getAll();
      setAds(response);
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Paper className="" elevation={2} variant="outlined" style={{ borderRadius: 10 }}>
        <img src={anuncio.src} alt="Logo" width={'100%'} height={200} style={{ maxHeight: 200, objectFit: 'cover', borderRadius: 10 }} />
      </Paper>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} p={2} mt={-5} mb={3} >
        <Box className="rounded-lg border-2 border-solid border-grey h-[15px] w-[15px]"></Box>
        <Box className="rounded-lg border-2 border-solid border-grey h-[15px] w-[15px]"></Box>
        <Box className="rounded-lg border-2 border-solid border-grey h-[15px] w-[15px]"></Box>
      </Grid>


      <Grid container spacing={{ xs: 2, md: 2 }} justifyContent={'center'} alignItems={'center'}>
        {categories.map((category: any, index: number) => {

          const img = `${environment.storageUrl}/${category?.files?.[0].path}`;
          return (
            <Grid key={index} sx={hover} onClick={onSelect}>
              <Paper elevation={2} variant="outlined" className="rounded-full h-[80px] w-[80px] m-auto p-4" >
                <img
                  src={img}
                  alt="Logo"
                  //width='70px'
                  //height='150px'
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
              </Paper>
              <Typography className="text-black text-center text-sm" style={{ color: 'grey' }}> </Typography>
            </Grid>
          )
        })}
      </Grid>

      <Typography variant="h6" className="text-black mt-5">POPULARES</Typography>
      <Box className="h-[2px] bg-[#01004c] mb-5 mt-1 w-[200px]" />

      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        alignItems={'center'} mt={2} >
        {ads.map((ad: any, idx: number) => (
          idx < 10 && <SingleAd key={'ad' + idx} ad={ad} />
        ))}
      </Grid>

      <Box className=" bg-[#11cd5454] mb-5 mt-1 w-[100%] absolute left-0 pb-10 mb-10" >
        <Typography variant="h6" className="text-black mt-7 ml-5 ">ANUNCIOS PATROCINADOS</Typography>
        <Box className="h-[2px] bg-[#01004c] mb-5 mt-1 w-[200px]" />

        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          alignItems={'center'} mt={2}
          justifyContent={'center'} >
          {ads.map((ad: any, idx: number) => (
            idx < 5 && <SingleAd key={'ad' + idx} ad={ad} />
          ))}
        </Grid>
      </Box>
      <Typography variant="h6" className="text-black mt-[430px]">NOVIDADE</Typography>
      <Box className="h-[2px] bg-[#01004c] mb-5 mt-1 w-[200px]" />

      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        alignItems={'center'} mt={2} >
        {ads.map((ad: any, idx: number) => (
          idx < 10 && <SingleAd key={'ad' + idx} ad={ad} />
        ))}

      </Grid>


    </div>
  );
}
