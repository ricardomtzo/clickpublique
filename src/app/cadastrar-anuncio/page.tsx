'use client'
import React, { useEffect, useState } from "react";
import { Grid2, Typography } from "@mui/material";
import CardOption from "@/components/CardOption";

import cama from '../assets/imgs/cama.png'
import carro from '../assets/imgs/carro.jpeg'
import casa from '../assets/imgs/casa.png'
import game from '../assets/imgs/game.png'
import ModalCustom from "@/components/ModalCustom";

const urlBase = 'http://localhost:8000';

export default function Home() {

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  const options1 = [
    {
      img: carro,
      label: 'Autos e Peças',
    },
    {
      img: cama,
      label: 'Produtos e Outros',
    },
    {
      img: casa,
      label: 'Imóveis',
    },
    {
      img: game,
      label: 'Serviços e Vagas',
    },
  ];


  useEffect(() => {
    getCategories();
  }, []);

  function getCategories(){

    fetch(urlBase + '/api/categories')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCategories(data);
      })
      .catch(error => console.error(error));
  }
  

  const Items = ({categorie}: any ) => {
    const image = urlBase + '/storage/' + categorie?.files?.[0].path;
    return (
      <Grid2 justifyItems="center">
        <CardOption img={image} label={categorie.name} onClick={() => {setOpen(true); setSelectedCategorie(categorie)}} />
      </Grid2>
    )
  }

  return (
    <Grid2
      p={10}
      m="auto"
      container
      justifyContent="center"
      sx={{ width: { xs: '100%', sm: '100%', md: '60%', lg: '60%', xl: '60%' } }} >
      <Typography variant="h4" color="black" className="w-[100%] text-center mb-5" >Oque você deseja vender?</Typography>
      <Grid2 container gap={2} className="mt-5" justifyContent="center" >
        {categories.map((categorie, index) => (
          <Items key={'cat' + index} categorie={categorie} />
        ))}
      </Grid2>

      <ModalCustom  open={open} selected={selectedCategorie} onClose={() => setOpen(false)} />
    </Grid2>
  );
}
