import { Paper, Typography } from "@mui/material"

const style = {
    width: 170,
    height: 170,
    maxWidth: 170,
    maxHeight: 170,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ":hover": {
        cursor: 'pointer',
        transform: 'scale(1.1)',
        transition: 'all 0.3s ease',
        elevation: 10
    }
}

export default function CardOption({ img, label, onClick }: { img: any, label: string, onClick: () => void }) {
    return (
        <div onClick={onClick}>
            <Paper className="" variant="outlined" sx={style}>
                <img src={img ?? 'asdads'} style={{ width: 130, height: 100, objectFit: 'contain' }} alt="image" />
            </Paper>
            <Typography mt={1} mb={3} variant="body1" color="black" className="text-center" >{label}</Typography>
        </div>
    )
}