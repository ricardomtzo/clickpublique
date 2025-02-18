import { Box, Grid2, Typography } from "@mui/material";
import { AddShoppingCartOutlined, AssignmentTurnedInOutlined, CheckCircleOutline, DisplaySettings } from "@mui/icons-material";
import sucess from "../../assets/imgs/sucess.jpg";

const sizeIcons = {
  fontSize: { xs: 30, sm: 30, md: 60, lg: 60, xl: 60 }
};

const sizeText = {
  width: { xs: 40, sm: 40, md: 100, lg: 150, xl: 150 },
};

const sizeBar = {
  width: { xs: 18, sm: 18, md: 80, lg: 120, xl: 250 },
  mt: { xs: 2, sm: 2, md: 4, lg: 4, xl: 4 }
};

export default function Cardpayment() {
  return (
    <Grid2 container spacing={2} flex1 justifyContent={"center"}>

      <Grid2 container className="w-[85%] mt-10" spacing={2}>

        <Grid2 className="justify-center" size={{ sm: 12, xs: 12 }} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }}>
          <img src={sucess.src} className="w-[60px] m-auto" style={{ objectFit: 'contain', alignSelf: 'center' }} />
        </Grid2>

        <Grid2 className="" size={{ md: 10 }} >
          <Typography variant="h5" className="font-bold" color="black" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }}>Compra realizada com sucesso.</Typography>
          <Typography mt={2} variant="body1" color="black" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }}>O número do seu pedido é <span className="text-[#3497F9]">#000000.</span> </Typography>
          <Typography mb={5} variant="body1" color="black" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' } }}>Em seguida você receberá um e-mail com os detalhes de seu pedido. </Typography>

          <Grid2 container spacing={5} className="mb-5">
            <Grid2>
              <Typography variant="p" color="black">Plano</Typography>
              <Typography variant="body1" className="font-bold" color="black">#NomePlano</Typography>
            </Grid2>
            <Grid2>
              <Typography variant="p" color="black">Nome</Typography>
              <Typography variant="body1" className="font-bold" color="black">Nome Sobrenome</Typography>
            </Grid2>
            <Grid2>
              <Typography variant="p" color="black">Vencimento plano</Typography>
              <Typography variant="body1" className="font-bold" color="black">Dia 15 de cada mês</Typography>
            </Grid2>
            <Grid2>
              <Typography variant="p" color="black">Valor</Typography>
              <Typography variant="body1" className="font-bold" color="black">R$ 000,00 / mês</Typography>
            </Grid2>
          </Grid2>

        </Grid2>

        <Grid2 className="" size={{ md: 2 }} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          <img src={sucess.src} alt="sucess" className="w-[110px] h-[200px]" />
        </Grid2>

      </Grid2>


      <Grid2 container className="w-[85%] pb-10">
        <Typography variant="h5" className="font-bold" color="black">Veja quais são os próximos passos</Typography>

        <Grid2 container className="w-[100%] m-0 my-5 justify-center">
          <Grid2 container className="w-[100%] justify-center align-items-center">
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CheckCircleOutline color="primary" sx={{ fontSize: sizeIcons.fontSize }} />
              <Typography className="text-center" variant="h6" color="primary" fontSize={12} sx={{ width: sizeText.width }}>Pedido enviado</Typography>
            </Box>
            <Box className="h-[4px] bg-[#3497F9] rounded-full" sx={sizeBar} />

            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'lightgray' }}>
              <AddShoppingCartOutlined color="gray" sx={{ fontSize: sizeIcons.fontSize }} />
              <Typography className="text-center" variant="h6" color="lightgray" fontSize={12} sx={{ width: sizeText.width }}>Aprovação pedido</Typography>
            </Box>
            <Box className="h-[4px] bg-gray-300 rounded-full" sx={sizeBar} />

            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'lightgray' }}>
              <DisplaySettings color="gray" sx={{ fontSize: sizeIcons.fontSize }} />
              <Typography className="text-center" variant="h6" color="lightgray" fontSize={12} sx={{ width: sizeText.width }}>Instalação ferramenta</Typography>
            </Box>
            <Box className="h-[4px] bg-gray-300 rounded-full" sx={sizeBar} />

            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'lightgray' }}>
              <AssignmentTurnedInOutlined color="gray" sx={{ fontSize: sizeIcons.fontSize }} />
              <Typography className="text-center" variant="h6" color="lightgray" fontSize={12} sx={{ width: sizeText.width }}>Ativação</Typography>
            </Box>
          </Grid2>
        </Grid2>

        <Typography variant="h5" className="font-bold mt-5" color="black">Confira nossos guias e artigos</Typography>

      </Grid2>
    </Grid2>
  );
}
