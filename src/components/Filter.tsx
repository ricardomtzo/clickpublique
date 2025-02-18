import React, { useState } from 'react';
import { 
  List, ListItem, Checkbox, FormControlLabel, Slider, TextField, Button, 
  Typography
} from '@mui/material';
import { CheckboxChangeEvent } from 'primereact/checkbox';

const FiltroLateral = () => {
  const [categoria, setCategoria] = useState({
    carros: false,
    imóveis: false,
    eletrônicos: false,
  });
  const [preco, setPreco] = useState([0, 1000]);
  const [localizacao, setLocalizacao] = useState('');

  const handleCategoriaChange = (event: any) => {
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
      <List style={{ width: 250, padding: 20, color: 'black' }}>
        <Typography variant="body1">Filtros</Typography>

        {/* Filtro por Categoria */}
        <Typography variant="body1">Categorias</Typography>

        <ListItem className='mt-2 h-[30px]'>
          <FormControlLabel
            control={
              <Checkbox
                checked={categoria.carros}
                onChange={handleCategoriaChange}
                name="carros"
              />
            }
            label="Carros"
          />
        </ListItem>
        <ListItem className='pt-0 h-[30px]'>
          <FormControlLabel
            control={
              <Checkbox
                checked={categoria.imóveis}
                onChange={handleCategoriaChange}
                name="imóveis"
              />
            }
            label="Imóveis"
          />
        </ListItem>
        <ListItem className='pt-0 h-[30px]'>
          <FormControlLabel
            control={
              <Checkbox
                checked={categoria.eletrônicos}
                onChange={handleCategoriaChange}
                name="eletrônicos"
              />
            }
            label="Eletrônicos"
          />
        </ListItem>

        {/* Filtro por Preço */}
        <Typography variant="body1">Preço</Typography>
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
        <Typography variant="body1">Localização</Typography>
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
