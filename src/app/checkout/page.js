'use client'
import React, { useState } from "react";
import { Box, Button, Divider, Grid2, List, ListItem, ListItemText, Radio, Typography } from "@mui/material";
import { CreditCard, PixOutlined } from "@mui/icons-material";
import Resumo from "@/components/Resumo";
import StepperCustom from "@/components/Stepper";
import boleto from "../assets/imgs/boleto.png";
import caixa from "../assets/imgs/caixa.png";
import { useRouter } from "next/navigation";

const style = {
  p: 0,
  width: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

export default function Home() {

  const route = useRouter();
  const [checked, setChecked] = useState('credit');

  const handleSelected = (event) => {
    setChecked(event.target.value);
  }

  const handleNextPage = () => {

    if (checked === 'credit') {
      route.push('/checkout/creditcardpayment');
    } else if (checked === 'debit') {
      route.push('/checkout/creditcardpayment');
    } else if (checked === 'pix') {
      route.push('/checkout/pixpayment');
    } else if (checked === 'boleto') {
      route.push('/checkout/boletopayment');
    }
  }

  return (
    <div className="pb-[150px]">
      <Grid2 container height={"100%"} backgroundColor="white">

        <Grid2
          container
          className="mt-10 justify-center"
          size={{ md: 6 }}>
          <Grid2 className="w-[90%]">
            <StepperCustom />
            <Typography variant="h6" color="black">Selecione a forma de pagamento</Typography>
            <Box className="h-[2px] bg-gray-300 my-2 mb-8" />
            <form>
              <List sx={style}>
                <ListItem>
                  <Radio
                    size="small"
                    value="credit"
                    name="radio-buttons"
                    checked={checked === 'credit'}
                    onChange={handleSelected}
                  />
                  <Box className="ml-2 mr-4 w-[35px] h-[35px] border border-gray-300 rounded-full p-1"><CreditCard className="text-[grey]" /></Box>
                  <ListItemText
                    primary="Cartão de crédito"
                    secondary="Parcelas disponíveis"
                    primaryTypographyProps={{ color: "black" }} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <Radio
                    size="small"
                    value="debit"
                    name="radio-buttons"
                    checked={checked === 'debit'}
                    onChange={handleSelected}
                  />
                  <Box className="ml-2 mr-4 w-[35px] h-[35px] border border-gray-300 rounded-full p-0"><img className="m-auto pt-2" src={caixa.src} alt="caixa" width={25} height={25} /></Box>
                  <ListItemText
                    primary="Cartão de débito"
                    secondary="Cartão de débito virtual Caixa"
                    primaryTypographyProps={{ color: "black" }} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <Radio
                    size="small"
                    value="pix"
                    name="radio-buttons"
                    checked={checked === 'pix'}
                    onChange={handleSelected}
                  />
                  <Box className="ml-2 mr-4 w-[35px] h-[35px] border border-gray-300 rounded-full p-1"><PixOutlined className="text-[#32C770]" /></Box>
                  <ListItemText
                    primary="PIX"
                    secondary="Aprovação na hora"
                    primaryTypographyProps={{ color: "black" }} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <Radio
                    size="small"
                    value="boleto"
                    name="radio-buttons"
                    checked={checked === 'boleto'}
                    onChange={handleSelected}
                  />
                  <Box className="ml-2 mr-4 w-[35px] h-[35px] border border-gray-300 rounded-full"><img className="m-auto pt-2" src={boleto.src} alt="caixa" width={25} height={25} /></Box>
                  <ListItemText
                    primary="Pagamento via boleto ou lotérica"
                    secondary="Vários pontos de pagamento"
                    primaryTypographyProps={{ color: "black" }} />
                </ListItem>
              </List>

              <Button
                fullWidth
                size="large"
                variant="contained"
                className="mt-5 mb-5"
                onClick={handleNextPage}
                style={{ backgroundColor: "#32C770" }}
              >Continuar </Button>

              <Typography variant="p" color="grey.400" className="mt-5">Os seus dados pessoais serão utilizados para processar a sua compra, apoiar a sua experiência neste site e para outros fins descritos na nossa política de privacidade.</Typography>

            </form>

          </Grid2>

        </Grid2>

        <Resumo />

      </Grid2>

    </div>
  );
}
