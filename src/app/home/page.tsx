'use client';
import { useEffect, useState } from "react";
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";
import anuncio from "../assets/imgs/anuncio.jpeg";

import SingleAd from "@/components/SingleAd";
import { environment } from "@/environments/environment";
import adsService from "@/services/AdsService";
import categoryService from "@/services/CategorieService";
import { Col, Row, RowScroll } from "@/components/Grids";
import { useRouter } from "next/navigation";
import { Carousel } from 'primereact/carousel';
import CustomCarousel from "@/components/CustomCarousel";
import YouTubeChannelVideos from "@/components/youtube";


const hover = {
  cursor: 'pointer',
  borderRadius: 200,
  ":hover": {
    transform: 'scale(1.1)',
    transition: 'all 0.3s ease',
    'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }
}

export default function Home() {

  const route = useRouter();
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

  const onSelect = () => {
    route.push(`/pesquisa`);
  }

  return (
    <div>
      <RowScroll className="p-3">
        {categories.map((category: any, index: number) => {

          const img = `${environment.storageUrl}/${category?.files?.[0].path}`;
          return (
            <Col key={'cat' + index} className="mr-2 m-auto" style={{ display: 'inline-block' }} >
              <Grid sx={hover} onClick={onSelect}>
                <Paper elevation={2} variant="outlined" className="rounded-xl h-[40px]  m-auto px-1 pr-2 py-2" >
                  <Row container>
                    <img
                      src={img}
                      alt="Logo"
                      style={{ objectFit: 'contain', width: '30px', height: '20px' }} />
                    <Typography className="text-center text-sm" style={{ color: 'grey' }}>{category?.name}</Typography>
                  </Row>
                </Paper>
              </Grid>
            </Col>
          )
        })}
        {categories.map((category: any, index: number) => {

          const img = `${environment.storageUrl}/${category?.files?.[0].path}`;
          return (
            <Col key={'cat' + index} className="mr-2 m-auto" style={{ display: 'inline-block' }} >
              <Grid sx={hover} onClick={onSelect}>
                <Paper elevation={2} variant="outlined" className="rounded-xl h-[40px]  m-auto px-1 pr-2 py-2" >
                  <Row container>
                    <img
                      src={img}
                      alt="Logo"
                      style={{ objectFit: 'contain', width: '30px', height: '20px' }} />
                    <Typography className="text-center text-sm" style={{ color: 'grey' }}>{category?.name}</Typography>
                  </Row>
                </Paper>
              </Grid>
            </Col>
          )
        })}
      </RowScroll>

      <CustomCarousel />

      <YouTubeChannelVideos />

      <Box className=" mb-5 left-0 px-4" >
        <Typography variant="h6" className="text-black mt-7 ">ANUNCIOS PATROCINADOS</Typography>
        <Box className="h-[2px] bg-[#01004c] mb-5 mt-1 w-[200px]" />
        <RowScroll className="py-5 px-2">
          {ads.map((ad: any, idx: number) => (
            idx < 5 && <Col key={'ad1' + idx} className="w-[230px] ml-3" style={{ display: 'inline-block' }} ><SingleAd ad={ad} /></Col>
          ))}
        </RowScroll>

        <Typography variant="h6" className="text-black mt-5">POPULARES</Typography>
        <Box className="h-[2px] bg-[#01004c] mb-5 mt-1 w-[200px]" />

        <RowScroll className="py-5">
          {ads.map((ad: any, idx: number) => (
            idx < 10 && <Col key={'ad' + idx} className="w-[230px] mr-2" style={{ display: 'inline-block' }} ><SingleAd key={'ad' + idx} ad={ad} /></Col>
          ))}
        </RowScroll>

        <Typography variant="h6" className="text-black mt-2">DESTAQUES</Typography>
        <Box className="h-[2px] bg-[#01004c] mb-5 mt-1 w-[200px]" />

        <RowScroll className="py-5 ">
          {ads.map((ad: any, idx: number) => (
            idx < 10 && <Col key={'ad2' + idx} className="w-[230px] mr-2" style={{ display: 'inline-block' }} ><SingleAd key={'ad' + idx} ad={ad} /></Col>
          ))}
        </RowScroll>

      </Box>

    </div>
  );
}
