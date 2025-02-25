'use client';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from '../app/assets/imgs/logo.jpg';
import { Avatar, Button } from '@mui/material';
import { ChatBubbleOutline, DashboardOutlined } from '@mui/icons-material';
import { useAuth } from '@/app/hooks/AuthService';
import { useRouter } from 'next/navigation';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '80%',
        [theme.breakpoints.up('md')]: {
            width: '18ch',
        },
    },
}));

export default function Navbar() {

    const route = useRouter();
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleNavigation = (location: string) => {
        route.push(location);
    }
    
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleNavigation('/perfil')}>Meu Perfil</MenuItem>
            <MenuItem onClick={() => handleNavigation('/meu-cadastro')}>Meu cadastro</MenuItem>
            <MenuItem onClick={() => handleNavigation('/login')}>Sair</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <Avatar>H</Avatar>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='pt-2' style={{ height: '90px', backgroundColor: '#01004c' }}>
                <Toolbar style={{ width: '90%', margin: '0 auto' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                    </Typography>

                    <img onClick={() => handleNavigation('/home')} src={logo.src} alt="Logo" width={70} height={80} style={{ maxHeight: 80, objectFit: 'cover', borderRadius: 10, cursor: 'pointer' }} />

                    <Button
                        variant='contained'
                        className='rounded-full ml-5 p-2'
                        style={{ backgroundColor: '#ffff', color: '#01004c', width: '350px' }}
                        onClick={() => handleNavigation('/cadastrar-anuncio')}>
                        Anunciar grátis
                    </Button>

                    <Search className='w-[50%]'>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Procurar..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        
                    </Search>
                    <Button onClick={() => handleNavigation('/pesquisa')} variant="outlined" size='small' className='text-[#fff] border-[#fff] mr-5 pt-1'>Buscar</Button>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <DashboardOutlined />
                        </IconButton>

                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <ChatBubbleOutline />
                            </Badge>
                        </IconButton>*/}
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="small"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            className='ml-2 border rounded-full border-solid border-grey'
                        >
                            <Avatar>H</Avatar>
                            <Typography className='ml-2 mr-2'>{user?.name}</Typography>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                    <Button
                        variant='contained'
                        className='rounded-full ml-5 p-2'
                        style={{ backgroundColor: '#12d658', color: '#fff', width: '350px' }}
                        onClick={() => handleNavigation('/planos')}>
                        Planos
                    </Button>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
