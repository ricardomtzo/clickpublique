'use client'
import React, { } from "react";
import { Grid2 } from "@mui/material";


export default function Container({ children }: 
  Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Grid2
      p={5}
      m="auto"
      container
      justifyContent="center"
      sx={{ width: { xs: '100%', sm: '100%', md: '60%', lg: '60%', xl: '60%' } }} >
        {children}
    </Grid2>
  );
}
