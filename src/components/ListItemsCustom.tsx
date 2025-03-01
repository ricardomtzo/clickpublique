import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import { useRouter } from 'next/navigation';


export default function ListItemsCustom({items, categoryType}: any) {
    const route = useRouter();
    const [open, setOpen] = React.useState(false);
    const [itemsList, setItemsList] = React.useState(items);

    const handleClick = () => {
        handleCategoryType(categoryType);
    };

    React.useEffect(() => {
        setItemsList(items);
    }, [items]);

    const handleCategoryType = (category: string) => {
        switch (category) {
            case "6":
                return route.push("/cadastrar-anuncio/veiculos");
            case "1":
                return route.push("/cadastrar-anuncio/imoveis");
            case "2":
                return route.push("/cadastrar-anuncio/produtos");
            case "4":
                return route.push("/cadastrar-anuncio/servicos_e_empregos");
            case "5":
                return route.push("/cadastrar-anuncio/servicos_e_empregos");       
            default:
                return route.push("/cadastrar-anuncio/veiculos");         
        }
    }


    return (
        <List
            sx={{ width: 500, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    
                </ListSubheader>
            }
        >
            {itemsList.map((text: any) => (
                <>
                    <ListItemButton onClick={handleClick}>
                        {/*<ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>*/}
                        <ListItemText primary={text} />
                        {/*open ? <ExpandLess /> : <ExpandMore />*/}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </>
            ))}


        </List>
    );
}