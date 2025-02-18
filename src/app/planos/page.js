'use client';
import React, { useState, useEffect } from "react";
import { Box, Button, Grid2, Paper, Switch, Typography } from "@mui/material";
import { ArrowForwardOutlined, CheckOutlined, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { styled } from '@mui/material/styles';


const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const planos = [
  {
    nome: 'FREE',
    preco: '0,00',
    precoAnual: '0,00',
    sub: 'sem cobrança'
  },
  {
    nome: 'BASIC',
    preco: '649',
    precoAnual: '649',
    sub: 'Válido por 1 mês'
  },
  {
    nome: 'PRO 100K',
    preco: '1.350',
    precoAnual: '1.350',
    sub: 'Válido por 1 mês',
    btnSelected: true
  },
  {
    nome: 'PRO 500K',
    preco: '5.519',
    precoAnual: '5.519',
    sub: 'Válido por 1 mês'
  },
]


export default function Cardpayment() {

  const planosInicMobile = planos.filter((item, i) => i === 0);

  //const [tipo, setTipo] = useState('CNPJ');
  const [currentPlano, setCurrentPlano] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  /*const handleTipo = (event) => {
    setTipo(event.target.value);
  };*/


  useEffect(() => {
    // Handler para atualizar o estado com o tamanho da tela
    const handleResize = () => {

      setCurrentPlano(window.innerWidth < 600 ? planosInicMobile : planos);

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Adiciona o listener quando o componente é montado
    window.addEventListener('resize', handleResize);

    // Chama a função para definir o tamanho inicial
    handleResize();

    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []); 
  //const currentITem = planos.find(item => item.btnSelected === true)

  const onChangePage = (index) => {
    if (index > planos.length - 1 || index < 0) return;

    setCurrentIndex(index);
    setCurrentPlano(planos.filter((item, i) => i === index));
  }

  const handleNextPage = () => {
    window.location.href = '/checkout';
  }

  return (
    <div className="bg-[#f4f5f9] flex flex-col height-[100%] pb-20">

      <Grid2
        container
        spacing={2}
        className="justify-center"
        sx={{ alignItems: 'flex-start' }}
      >

        <Box className="mt-10 max-h-[150px] text-center">
          <Typography className="mb-2 font-bold text-center" variant="h5" color="black">Preço & Planos</Typography>
          <Typography className="mt-5" variant="p" color="gray">Escolhe um plano e comece agora a vender seus produtos</Typography>
        </Box>

        <Grid2
          container
          size={{ md: 6 }}
          className="justify-center w-full mt-2 h-[80px]"
          sx={{ alignItems: 'center' }} >
          <Typography variant="subtitle1" color="black">Mensal</Typography>
          <Android12Switch />
          <Typography variant="subtitle1" color="black">Anual</Typography>
          <Box className="bg-[#3497f91a] h-[25px] rounded-full px-4 py-1">
            <Typography variant="subtitle2" className="text-[13px] m-auto" color="#3497F9">ECONOMIZE 25%</Typography>
          </Box>
        </Grid2>

        <Grid2
          container
          className="justify-center w-full"
          size={{ md: 6 }}
       /* sx={{ 
          height: { md: 'auto', sm: '800px', xs: '700px' },
          overflow: { md: 'auto', sm: 'hidden', xs: 'hidden' },
          overflowX: { md: 'auto', sm: 'auto', xs: 'auto' },
          flexDirection: { md: 'row', sm: 'column', xs: 'column' },
         }}*/>
          {currentPlano?.map((plano) => (
            <Paper
              key={plano.nome}
              variant="outlined"
              className="height-[800px]  rounded-lg p-5"
              sx={{
                maxWidth: { md: '270px', sm: '90%', xs: '90%' },
                minWidth: { md: '270px', sm: '90%', xs: '90%' }
              }}
            >

              {plano.btnSelected && <Box
                className="bg-[#000000] h-[25px] px-4 mt-[-20px] mr-[-20px] float-right w-[130px]"
                sx={{ borderRadius: '0 10px 0px 10px' }}>
                <Typography variant="body2" className="text-[13px] m-auto pt-1" color="#fff">MAIS VENDIDO</Typography>
              </Box>}

              <Typography variant="subtitle2" className="text-[13px] m-auto mt-3" color="#3497F9">{plano.nome}</Typography>
              <Typography variant="h3" className="font-bold mt-5 mb-3" color="black">
                <span className="text-[20px]">R$</span> {plano.preco}
                <span className="text-[16px] font-normal"> / mês</span>
              </Typography>

              <Typography variant="p" className="mt-5 mb-5 text-[14px]" color="black">{plano.sub}</Typography>
              {Array.from({ length: 6 }).map((_, index) => (
                <Typography className="mt-5 text-[15px]" key={index}><CheckOutlined color="success" /> Lorem ipsum</Typography>

              ))}

              {!plano.btnSelected ?
                <Button
                  variant="outlined"
                  onClick={handleNextPage}
                  style={{ textTransform: 'initial' }}
                  className="mt-6 w-full bg-[#3497f91a] text-[#3497f9] border-0 w-[80%] h-[45px]">
                  Testar Grátis
                  <ArrowForwardOutlined className="ml-8" fontSize="small" />
                </Button>
                :
                <Button
                  variant="outlined"
                  onClick={handleNextPage}
                  style={{ textTransform: 'initial' }}
                  className="mt-6 w-full rounded-lg bg-[#3497f9] text-[#ffff] border-0 w-[80%] h-[45px]">
                  Testar Grátis
                  <ArrowForwardOutlined className="ml-8" fontSize="small" />
                </Button>
              }

              {windowSize.width < 768 && <Box
                onClick={() => onChangePage(currentIndex - 1)}
                className="cursor-pointer absolute left-[10px] bottom-[50%] h-[50px] w-[50px] bg-[#3497f91a] rounded-full py-3 px-3" >
                <ChevronLeft className="m-auto text-[#3497F9] text-[25px]" fontSize="small" />
              </Box>}

              {windowSize.width < 768 && <Box
                onClick={() => onChangePage(currentIndex + 1)}
                className="cursor-pointer absolute right-[10px] bottom-[50%] h-[50px] w-[50px] bg-[#3497f91a] rounded-full py-3 px-3" >
                <ChevronRight className="m-auto text-[#3497F9] text-[25px]" fontSize="small" />
              </Box>}
            </Paper>
          ))}
        </Grid2>

        <Box className="h-[200px]" />

      </Grid2>

    </div>
  );
}
