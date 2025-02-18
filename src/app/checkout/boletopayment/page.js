import Image from "next/image";
import { Box, Button, Grid2, List, ListItem, ListItemText, Radio, TextField, Typography } from "@mui/material";
import { ArrowForwardOutlined, WarningAmber } from "@mui/icons-material";
import Resumo from "@/components/Resumo";
import StepperCustom from "@/components/Stepper";
import boleto from "../../assets/imgs/boleto.png";

const style = {
  p: 0,
  width: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'grey.100',
};

export default function Boletopayment() {
  return (
    <div>

      <Grid2 container spacing={2} height={"100%"} pb={5} backgroundColor="white">

        <Grid2 container className="mt-10 justify-center" size={{ md: 6 }}>
          <Grid2 className="w-[90%]">
            <StepperCustom />
            <Typography variant="h6" color="black">Inserir detalhes de pagamento</Typography>
            <Box className="h-[2px] bg-gray-300 my-2 mb-8" />

            <form >
              <List sx={style}>
                <ListItem>
                  <Radio
                    checked
                    size="small"
                    value="a"
                    name="radio-buttons"
                  />
                  <Box className="ml-2 mr-4 w-[35px] h-[35px] border border-gray-300 rounded-full"><Image className="m-auto pt-2" src={boleto} alt="caixa" width={25} height={25} /></Box>
                  <ListItemText
                    primary="Pagamento via boleto ou lotérica"
                    secondary="Vários pontos de pagmento"
                    primaryTypographyProps={{ color: "black" }} />
                  <Typography variant="subtitle2" color="primary" className="">Editar</Typography>
                </ListItem>
              </List>

              <Box className="my-6">
                <Typography variant="subtitle2" color="black" className="mt-5 mb-3">Nome completo</Typography>
                <TextField
                  fullWidth
                  variant="outlined" />
              </Box>

              <Typography variant="subtitle2" color="black" className="mt-5 mb-3">E-mail</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="exemplo@exemplo.com" />

              <Box className="my-6">
                <Typography variant="subtitle2" color="black" className="mt-5 mb-3">CPF</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="000.000.000-00" />
              </Box>

              <Grid2 container className="my-6 border border-[#FFC722] rounded-md p-2" bgcolor={"#FFFAAD"}>
                <Grid2 className="w-[10%] mt-2 text-center">
                  <WarningAmber color="warning" />
                </Grid2>
                <Grid2 className="w-[90%]">
                  <Typography variant="p" color="red" className="font-bold ">Ao final da compra, você recebera o boleto para efetuar o pagamento.</Typography>
                </Grid2>
              </Grid2>

              <Button
                fullWidth
                size="large"
                variant="contained"
                className="mt-5 float-right mb-5"
                style={{ backgroundColor: "#32C770" }}
              >RECEBER PIX R$ 649,00 <ArrowForwardOutlined /></Button>

              <Typography variant="p" color="grey.400" className="mt-5">Os seus dados pessoais serão utilizados para processar a sua compra, apoiar a sua experiência neste site e para outros fins descritos na nossa política de privacidade.</Typography>
            </form>
          </Grid2>

        </Grid2>

        <Resumo />
      </Grid2>

    </div>
  );
}
