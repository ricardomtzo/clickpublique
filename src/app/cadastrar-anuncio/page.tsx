'use client'
import React, { useEffect, useState } from "react";
import { Grid2, Typography } from "@mui/material";
import CardOption from "@/components/CardOption";
import ModalCustom from "@/components/ModalCustom";
import { useRouter } from "next/navigation";
import { environment } from "@/environments/environment";

const urlBase = environment.apiUrl;
const urlStorage = environment.storageUrl;
export default function Home() {

  const route = useRouter();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {

    fetch(urlBase + '/categories')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCategories(data);
      })
      .catch(error => console.error(error));
  }

  const handlerClickCard = (categorie: any) => {
    if (categorie.name === 'Serviços' || categorie.name === 'Empregos') {
      route.push('/cadastrar-anuncio/servicos_e_empregos');
    } else {
      setOpen(true);
      setSelectedCategorie(categorie)
    }
  }

  const Items = ({ categorie }: any) => {
    const image = urlStorage + '/' + categorie?.files?.[0].path;
    return (
      <Grid2 justifyItems="center">
        <CardOption img={image} label={categorie.name} onClick={() => handlerClickCard(categorie)} />
      </Grid2>
    )
  }

  return (
    <Grid2
      p={3}
      m="auto"
      pb={10}
      container
      justifyContent="center"
      sx={{ width: { xs: '100%', sm: '100%', md: '60%', lg: '60%', xl: '60%' } }} >
      <Typography variant="h4" color="black" className="w-[100%] text-center mb-5" >Oque você deseja vender?</Typography>
      <Grid2 container gap={2} className="mt-5" justifyContent="center" >
        {categories.map((categorie, index) => (
          <Items key={'cat' + index} categorie={categorie} />
        ))}
      </Grid2>

      <ModalCustom open={open} selected={selectedCategorie} onClose={() => setOpen(false)} />
    </Grid2>
  );
}
