import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useRouter } from 'next/navigation';


export default function ListItemsCustom({items}: any) {
    const route = useRouter();
    const [open, setOpen] = React.useState(false);
    const [itemsList, setItemsList] = React.useState(items);

    const handleClick = () => {
        route.push("/cadastrar-anuncio/informacoes");
        //setOpen(!open);
    };

    React.useEffect(() => {
        setItemsList(items);
    }, [items]);

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