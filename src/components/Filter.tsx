import React, { useEffect, useState } from 'react';
import {
  List, ListItem, Checkbox, FormControlLabel, Slider, TextField, Button,
  Typography,
  Box
} from '@mui/material';
import { CheckboxChangeEvent } from 'primereact/checkbox';
import CategorieService from '@/services/CategorieService';
import { useRouter } from 'next/navigation';

const FiltroLateral = ({params}: any) => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [preco, setPreco] = useState([0, 1000]);
  const [localizacao, setLocalizacao] = useState('');
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const categoriesList = params.categories?.split(',');
    const price = params.minPrice && params.maxPrice ? [params.minPrice, params.maxPrice] : [0, 1000];
    setPreco(price);
    setLocalizacao(params.location);
    setSelectedCategories(categoriesList || []);
    getCategories();
  }, [params]);

  const getCategories = async () => {
    try {
      const response = await CategorieService.getAll();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCategoryChange = (event: any) => {
    console.log(event.target.checked);
    setSelectedCategories(event.target.checked ? [...selectedCategories, event.target.value] : selectedCategories.filter((id: any) => id !== event.target.value));
  };

  const handlePrecoChange = (event: any, newValue: any) => {
    setPreco(newValue);
  };

  const handleLimparFiltros = () => {
    setSelectedCategories([]);
    setPreco([0, 1000]);
    setLocalizacao('');
  };

  const handleAplicarFiltros = () => {
    router.push(`/pesquisa?categories=${selectedCategories}&minPrice=${preco[0]}&maxPrice=${preco[1]}&location=${localizacao}`);
  };

  return (
    <List style={{ width: 290, padding: 20, color: 'black' }}>
      <Typography variant="h6">Filtros</Typography>
      <Box className="h-[2px] bg-gray-300 my-1 mb-4" />

      {/* Filtro por Categoria */}
      <Typography variant="body2">Categorias</Typography>


      {categories.map((category: any) => (
        <ListItem key={category.id} className='mt-2 h-[30px]'>
          <FormControlLabel
            control={
              <Checkbox
                //checked={selectedCategories.includes(category.id)}
                onChange={handleCategoryChange}
                name={category.name}
                value={category.type}
              />
            }
            label={category.name}
          />
        </ListItem>
      ))}

      {/* Filtro por Preço */}
      <Typography className='mt-3' variant="body2">Preço</Typography>
      <ListItem>
        <Slider
          value={preco}
          onChange={handlePrecoChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
        />
      </ListItem>

      {/* Filtro por Localização */}
      <Typography className='mt-3' variant="body2">Cidade</Typography>
      <TextField
        label="Cidade"
        variant="outlined"
        className='mt-2'
        size='small'
        value={localizacao}
        onChange={(e) => setLocalizacao(e.target.value)}
        fullWidth
      />

      {/* Botões de Ação */}
      <Button variant="contained" className='mt-2' color="primary" fullWidth onClick={handleAplicarFiltros}>
        Aplicar Filtros
      </Button>
      <Button variant="outlined" className='mt-2' color="secondary" fullWidth onClick={handleLimparFiltros}>
        Limpar Filtros
      </Button>
    </List>
  );
};

export default FiltroLateral;
