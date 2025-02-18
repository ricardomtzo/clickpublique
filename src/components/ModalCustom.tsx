import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CloseOutlined } from '@mui/icons-material';
import ListItemsCustom from './ListItemsCustom';

export default function ModalCustom({ open, selected, onClose }: any) {
    /*const [openModal, setOpen] = React.useState(open);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };*/

    const items = selected?.children.map((item: any) => item.name);
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ sx: { borderRadius: 4 } }} >
                <DialogTitle id="alert-dialog-title">
                    {selected?.name}
                    <Button className='float-right' onClick={onClose}><CloseOutlined /></Button>
                </DialogTitle>
                <DialogContent>
                    <ListItemsCustom items={items} />
                </DialogContent>
                {/*<DialogActions>
                    <Button onClick={onClose}>Disagree</Button>
                    <Button onClick={onClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>*/}
            </Dialog>
        </React.Fragment>
    );
}
