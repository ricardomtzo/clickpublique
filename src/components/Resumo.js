'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid2, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ArrowDownwardOutlined, ArrowUpwardOutlined, CheckRounded, ErrorOutline } from "@mui/icons-material";
import plano from "../app/assets/imgs/plano.png";

const container2 = {
    borderLeft: '0px solid',
};

export default function Resumo() {

    const [show, setShow] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    const handleShow = () => {
        setShow(!show);
    };

    const windowWidth = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth;
        }else{
            return 0
        }
    }

    useEffect(() => {
        // Handler para atualizar o estado com o tamanho da tela
        const handleResize = () => {

            setShow(windowWidth() > 600);

            setWindowSize({
                width: windowWidth(),
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

    return (
        <Grid2
            container
            className="justify-center"
            size={{ md: 6 }}
            style={container2}
            sx={{
                //overflow: 'auto',
                alignContent: 'flex-start',
                mt: { md: 12, sm: 0, xs: 0 },
                px: { md: 'auto', sm: 'auto', xs: 'auto' },
                pb: { md: 0, sm: 6, xs: 6 },
                width: { md: '48%', sm: '100%', xs: '100%' },
                position: { md: 'relative', sm: 'absolute', xs: 'absolute' },
                height: { md: 'auto', sm: show ? 'auto' : '80px', xs: show ? 'auto' : '80px' },
                backgroundColor: { md: 'transparent', sm: !show ? 'transparent' : '#fff', xs: !show ? 'transparent' : '#fff' },
            }}
        >
            <Grid2
                container
                className="h-[70px] w-[100%] bg-[#f4f5f9] justify-between pl-4 pt-5"
                sx={{ display: { sm: 'flex', xs: 'flex', md: 'none' } }}>
                <Grid2 className="w-[49%]">
                    <Typography variant="h6" color="black">Resumo do pedido </Typography>
                </Grid2>
                <Grid2 className="w-[10%]">
                    <Typography onClick={handleShow} variant="h6" color="black">
                        {!show ? <ArrowDownwardOutlined color="black" />
                            : <ArrowUpwardOutlined color="black" />}
                    </Typography>
                </Grid2>
            </Grid2>

            <Box
                className=" border p-6 md:rounded-2xl bg-[#f4f5f9] "
                sx={{
                    width: { md: '90%', sm: '100%', xs: '100%' },
                    display: show ? "block" : "none",
                }}
            >
                <Typography variant="h6" color="black">Resumo do pedido</Typography>
                <Box className="h-[2px] bg-gray-300 my-2" />

                <Grid2 container spacing={2} className="my-8 ">
                    <Grid2 item className="w-[15%]">
                        <img src={plano.src} width={60} height={60} alt="plano" />
                    </Grid2>
                    <Grid2 item className="w-[60%]">
                        <Typography variant="p" className="font-bold" color="black">Plano basic</Typography>
                        <Typography variant="body1" color="grey">50.000 usuários mês</Typography>
                    </Grid2>
                    <Grid2 item className="float-right text-right ">
                        <Typography variant="h6" color="black">R$ 649,00</Typography>
                    </Grid2>
                </Grid2>
                <Box className="h-[2px] bg-gray-300 my-2 mb-6" />

                <Typography variant="body1" className="" color="black"><ErrorOutline className="mb-1" /> Detalhes</Typography>

                <Grid2 container spacing={2} className="my-8 justify-between">
                    <Grid2>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                    </Grid2>
                    <Grid2>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                        <Typography variant="h6" className="font-weight-[500]" color="grey"> <CheckRounded fontSize="large" sx={{ color: "grey" }} /> 50 usuários mês</Typography>
                    </Grid2>
                </Grid2>
                <Box className="h-[2px] bg-gray-300 my-2 mb-6" />

                <List>
                    <ListItem>
                        <ListItemText
                            primary="Total"
                            secondary="Inclusos taxas e impostos"
                            primaryTypographyProps={{ color: "black", fontWeight: "500" }} />
                        <Typography variant="h4" className="font-weight-[500]" color="black">R$ 649,00</Typography>

                    </ListItem>
                </List>
            </Box>

        </Grid2 >
    );
}
