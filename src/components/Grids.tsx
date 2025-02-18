import { Grid2, Grid2Props } from "@mui/material"


export const Col = (props: Grid2Props) => {
    return (
        <Grid2  sx={{ display: 'flex', flexDirection: 'column'}} {...props}  />
    )
}

export const Row = (props: Grid2Props) => {
    return (
        <Grid2  {...props} sx={{ }} />
    )
}