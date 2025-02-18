'use client';
import { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Grid2 as Grid, Link, Paper, Typography } from "@mui/material";
import { EmailOutlined, FacebookOutlined, FavoriteBorder, Flag, PhoneAndroid, Security, Share, WhatsApp } from "@mui/icons-material";
import Gallerie from "@/components/Galleria";
import LineSpace from "@/components/LineSpace";
import ProductsList from "@/components/Products";
import { useSearchParams } from "next/navigation";
import adsService from "@/services/AdsService";
import categoryService from "@/services/CategorieService";

const typesCat: any = {
  'App\\Models\\CarAd': '6'
}

export default function Home() {

  const searchParams = useSearchParams();
  const idAd = searchParams.get("ad") || '';

  const [ad, setAd] = useState<any>(null);
  const [category, setCategory] = useState<any>([]);

  useEffect(() => {

    getAdById()
    .then((data) => getCategory(data));
    
  }, [])

  const getAdById = async () => {
    try {
    const response = await adsService.getById(idAd);
    setAd(response);
    console.log(response);
    return response;
    } catch (error) {
      console.error(error);
    }
  }

  const getCategory = async (data: any) => {
      try {
        const response = await categoryService.getAll();
        console.log(data?.ad_type_type);
        setCategory(response.find((item: any) => item.type == typesCat[data?.ad_type_type] ));
      } catch (error) {
        console.error(error);
      }
  }

  const breadcrumbs = [
    <Link className="text-[14px]" underline="hover" key="1" color="inherit" href="/" >
      Bahia
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      className="text-[14px]"
      href="/material-ui/getting-started/installation/"
    //onClick={handleClick}
    >
      Salvador
    </Link>,
    <Typography className="text-[14px]" key="3" sx={{ color: 'text.primary' }}>
      {category?.name}
    </Typography>,
  ];

  return (
    <div>
      <Grid
        container
        spacing={2}
        size={{ md: 10 }}
      >

        <Grid size={{ xs: 12, md: 8 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>

          <Typography variant="h5" className="text-black mt-5">{ad?.title}</Typography>

          <Typography variant="body2" className="text-grey mt-2 mb-7" color="text.secondary">
            Publicado em {new Date(ad?.created_at).toLocaleDateString()}
          </Typography>
          <Gallerie imageList={ad?.files} />
        </Grid>

        <Grid className="" size={{ xs: 12, md: 4 }}>
          <Button className="text-grey mt-10 mb-7 h-[60px] bg-[#01004c]" size="large" fullWidth variant="contained">
            R$ {ad?.price}
          </Button>
          <Paper elevation={2} variant="outlined" style={{ borderRadius: 10 }}>
            <Box display="flex" className="w-[100%] flex-col justify-center p-10">
              <Typography variant="h5" className="text-grey text-center mt-2 mb-5" color="text.secondary">
                {ad?.user?.name}
              </Typography>

              <Button className="text-grey mt-2 text-[#5fd946] border-[#5fd946]" variant="outlined" endIcon={<WhatsApp />}>
                Iniciar a negociação
              </Button>

              <Typography variant="body2" className="text-grey mt-2 text-center mb-4" color="text.secondary">
                Último acesso há 1 hora
              </Typography>

              <LineSpace />

              <Typography variant="body2" className="text-grey mt-2 text-center mb-4" color="text.secondary">
                Verificado com: <PhoneAndroid fontSize="small" /> <FacebookOutlined /> <EmailOutlined />
              </Typography>

              <Link className="text-[14px] text-center" underline="hover" key="1" href="/" >
                Ver todos os anúncios
              </Link>
            </Box>
          </Paper>

          <Paper elevation={2} className="rounded-lg mt-8" variant="outlined" >
            <Box display="flex" className="w-[100%] flex-col justify-center p-5">
              <Typography variant="h6" className="text-grey text-center mb-4" color="text.secondary">
                <Security className="text-[50px] text-grey text-center mt-2 mb-3" />
                Dicas de segurança
              </Typography>
              <Box className="h-[1px] w-[80%] bg-[lightgrey] mb-5 m-auto" />

              <Typography variant="body2" className="text-grey mt-2 text-center mb-4" color="text.secondary">
                Não faça pagamentos antes de verificar o que
              </Typography>

              <Link className="text-[14px] text-center" underline="hover" key="1" href="/" >
                Ver todas as dicas de segurança
              </Link>
            </Box>
          </Paper>
        </Grid>

        <Grid>
          <Typography variant="h5" className="text-black ">R$ {ad?.price}</Typography>

          <Typography variant="body2" className="text-grey mt-5 mb-7" color="text.secondary">
            {ad?.description}
          </Typography>

          <Grid container spacing={2}>
            <Button

              variant="outlined"
              startIcon={<FavoriteBorder />}
              className="mb-5 rounded-full"
            >
              Favoritar
            </Button>

            <Button

              variant="outlined"
              startIcon={<Share />}
              className="mb-5 rounded-full"
            >
              Compartilhar
            </Button>

            <Button

              variant="outlined"
              startIcon={<Flag />}
              className="mb-5 rounded-full"
            >
              Denunciar
            </Button>
          </Grid>

          <LineSpace margin="0" width="100px" text="Detalhes"/>

          <LineSpace margin="0" width="120px" text="Localização"/>

          <LineSpace margin="0" width="320px" text="Também podem te interessar"/>
         
          <ProductsList />
        </Grid>

      </Grid>
    </div >
  );
}
