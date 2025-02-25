import React, { useEffect, useState } from 'react';
import {
  List, ListItem, Checkbox, FormControlLabel, Slider, TextField, Button,
  Typography,
  Box
} from '@mui/material';
import { CheckboxChangeEvent } from 'primereact/checkbox';
import CategorieService from '@/services/CategorieService';

const FiltroLateral = () => {
  const [categoria, setCategoria] = useState<any>({});
  const [preco, setPreco] = useState([0, 1000]);
  const [localizacao, setLocalizacao] = useState('');
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await CategorieService.getAll();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCategoryChange = (event: any) => {
    setCategoria({
      ...categoria,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePrecoChange = (event: any, newValue: any) => {
    setPreco(newValue);
  };

  const handleLimparFiltros = () => {
    setCategoria({
      carros: false,
      imóveis: false,
      eletrônicos: false,
    });
    setPreco([0, 1000]);
    setLocalizacao('');
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
                checked={categoria[category.slug]}
                onChange={handleCategoryChange}
                name={category.name}
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
      <Typography className='mt-3' variant="body2">Localização</Typography>
      <TextField
        label="Cidade ou Região"
        variant="outlined"
        className='mt-2'
        size='small'
        value={localizacao}
        onChange={(e) => setLocalizacao(e.target.value)}
        fullWidth
      />

      {/* Botões de Ação */}
      <Button variant="contained" className='mt-2' color="primary" fullWidth>
        Aplicar Filtros
      </Button>
      <Button variant="outlined" className='mt-2' color="secondary" fullWidth onClick={handleLimparFiltros}>
        Limpar Filtros
      </Button>
    </List>
  );
};

export default FiltroLateral;
