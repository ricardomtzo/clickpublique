import { Box, Button, Grid2, List, ListItem, ListItemText, Radio, TextField, Typography } from "@mui/material";
import { ArrowForwardOutlined, PixOutlined, WarningAmber } from "@mui/icons-material";
import Resumo from "@/components/Resumo";
import StepperCustom from "@/components/Stepper";

const style = {
  p: 0,
  width: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'grey.100',
};

export default function Cardpayment() {
  return (
    <div>

      <Grid2 container spacing={2} height={"100vh"} backgroundColor="white">

        <Grid2 container className="mt-10 justify-center" size={{ md: 6 }}>
          <Grid2 className="w-[90%]">
            <StepperCustom />
            <Typography variant="h6" color="black">Inserir detalhes de pagamento</Typography>
            <Box className="h-[2px] bg-gray-300 my-2 mb-8" />
            <form>
              <List sx={style}>
                <ListItem>
                  <Radio
                    checked
                    size="small"
                    value="a"
                    name="radio-buttons"
                  />
                  <Box className="ml-2 mr-4 w-[35px] h-[35px] border border-gray-300 rounded-full p-1"><PixOutlined className="text-[#32C770]" /></Box>
                  <ListItemText
                    primary="Pix"
                    secondary="Aprovação na hora"
                    primaryTypographyProps={{ color: "black" }} />
                  <Typography variant="subtitle2" color="primary" className="">Editar</Typography>
                </ListItem>
              </List>

              <Box className="my-8">
                <Typography variant="subtitle2" color="black" className="mt-10 mb-3">Insira o e-mail para receber o código</Typography>
                <TextField
                  fullWidth
                  variant="outlined" />
              </Box>

              <Grid2 container className="my-8 border border-[#FFC722] rounded-md p-2" bgcolor={"#FFFAAD"}>
                <Grid2 className="w-[10%] text-center align-center">
                  <Grid2><WarningAmber className="m-auto text-[#B41E13]" /></Grid2>
                </Grid2>
                <Grid2 className="w-[90%]">
                  <Typography color="#B41E13" sx={{fontWeight: "500"}}>Ao final da compra, você recebera o código para efetuar o pagamento.</Typography>
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
