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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdsService from "@/services/AdsService";
import { environment } from "@/environments/environment";
import { isMobile } from "@/config/utils";
import { Col } from "@/components/Grids";


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

  const route = useRouter();
  const routeParams = useSearchParams();
  const [ads, setAds] = useState<any>([]);

  const minPrice = routeParams.get('minPrice');
  const maxPrice = routeParams.get('maxPrice');
  const location = routeParams.get('location');
  const searchWord = routeParams.get('search');
  const categories = routeParams.get('categories');

  useEffect(() => {
    getAds();
  }, [searchWord, categories, minPrice, maxPrice, location]);

  const getAds = async () => {
    try {
      const response = await AdsService.getAll({
        search: searchWord,
        categories: categories,
        minPrice: minPrice,
        maxPrice: maxPrice,
        location: location
      });

      if (response) {
        setAds(response);
      } else {
        setAds([]);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const onSelect = (id: string) => {
    route.push(`/item?ad=${id}`);
  }

  return (
    <Grid
      mt={2}
      container
      spacing={{ xs: 1, md: 1 }}
      sx={{ margin: 'auto', maxWidth: '900px', minHeight: '100vh' }}
    >
      {!isMobile() && <Col size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
        <FiltroLateral
          params={{
            search: searchWord,
            categories: categories,
            minPrice: minPrice,
            maxPrice: maxPrice,
            location: location
          }} /></Col>}

      <Grid
        //container
        spacing={{ xs: 1, md: 1 }}
        size={{ md: 8 }}
        sx={{ borderLeft: !isMobile() ? '1px solid lightgrey' : '', paddingLeft: !isMobile() ? '20px' : '' }}>
        {ads?.map((ad: any, index: number) => {

          const img = `${environment.storageUrl}/${ad?.files?.[0]?.path}` || '';

          return (
            <Grid key={index} mb={2} sx={hover} className="max-w-[600px] md:min-w-[100%] w-[100%] max-h-[200px]" onClick={() => onSelect(ad.id)}>
              <Paper elevation={2} variant="outlined" className="rounded-xl h-[200px] w-[100%] m-auto" >
                <Grid container>
                  <Grid size={{ xs: 4, sm: 4, md: 4 }}>
                    <img
                      src={img}
                      alt="Logo"
                      style={{ objectFit: 'cover', height: 200, width: '250px', borderRadius: 10, borderBottomRightRadius: 0, borderTopRightRadius: 0 }} />
                  </Grid>
                  <Grid className="p-2 pl-4 h-[200px]" size={{ xs: 8, sm: 8, md: 8 }}>
                    <Typography className="text-black mt-5">{ad?.title}</Typography>
                    <Typography variant="body2" className="text-grey mt-5" color="text.secondary">{ad?.description}</Typography>
                    <Box className="mt-[65px]" />
                    <Typography
                      variant="body2"
                      className="mt-5 text-[grey]">
                      {/*<LocationOnOutlined fontSize="small" /> São Paulo | SP*/}
                      <span className="text-bold text-black mb-2 float-right mr-3 text-[16px] ">R$ {ad?.price}</span>
                    </Typography>

                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )
        })}

        {ads?.length === 0 && <Typography variant="body2" className="text-grey mt-5 m-auto" color="text.secondary">Nenhum anúncio encontrado</Typography>}
      </Grid>
    </Grid>
  );
}
