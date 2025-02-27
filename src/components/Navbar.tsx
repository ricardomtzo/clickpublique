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
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../app/assets/imgs/logo.jpg';
import { Avatar, Button } from '@mui/material';
import { AddCircleOutlineOutlined, HomeOutlined, MenuOutlined, PermIdentityOutlined, PostAddOutlined, ReceiptLongOutlined, SearchOutlined } from '@mui/icons-material';
import { useAuth } from '@/app/hooks/AuthService';
import { useRouter } from 'next/navigation';
import { Col, Row } from './Grids';

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

    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);
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
            <MenuItem onClick={() => handleNavigation('/meu-cadastro')}>
                <IconButton size="large" color="inherit">
                    <PermIdentityOutlined />
                </IconButton>
                <p>Meus dados</p>
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/perfil')}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <PostAddOutlined />
                </IconButton>
                <p>Meu perfil</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <Avatar>{user?.name?.charAt(0)}</Avatar>
                <p className='ml-2'>{user?.name} </p>
            </MenuItem>
        </Menu>
    );

    const desktopMenu = (
        <AppBar position="static" className='pt-2' style={{ height: '80px', backgroundColor: '#01004c' }}>
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
                    className='rounded-full ml-5 px-5 '
                    style={{ backgroundColor: '#ffff', color: '#01004c' }}
                    onClick={() => handleNavigation('/cadastrar-anuncio')}>
                    Anunciar
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
                <Button
                    variant='contained'
                    className='rounded-full ml-5 px-5'
                    style={{ backgroundColor: '#12d658', color: '#fff' }}
                    onClick={() => handleNavigation('/planos')}>
                    Planos
                </Button>
            </Toolbar>
        </AppBar>
    )

    const mobileIcon = (title: string, page: string, icon: any) => {
        return (
            <Col className='flex'  onClick={() => handleNavigation('/' + page)}>
                {icon}
                <p className='text-[#9f9f9f] text-xs'>{title}</p>
            </Col>
        )
    }

    const mobileMenu = (
        <AppBar position="fixed" className='py-3 px-5 bg-[#f2f2f2] border-t-[1px] border-solid border-[#bdbdbd]' style={{ bottom: 0, top: 'auto' }}>
            <Row className='w-full flex justify-between'>
                {mobileIcon('Início', 'home', <HomeOutlined className='m-auto text-[#9f9f9f] text-3xl' />)}
                {mobileIcon('Buscar', 'pesquisa', <SearchOutlined className='m-auto text-[#9f9f9f] text-3xl' />)}
                {mobileIcon('Anunciar', 'cadastrar-anuncio', <AddCircleOutlineOutlined className='m-auto text-[#9f9f9f] text-3xl' />)}
                {mobileIcon('Planos', 'planos', <ReceiptLongOutlined className='m-auto text-[#9f9f9f] text-3xl' />)}
                <Col onClick={handleMobileMenuOpen}>
                    <MenuOutlined className='text-[#9f9f9f] text-3xl' />
                    <p className='text-[#9f9f9f] text-xs'>Menu</p>
                </Col>
            </Row>
        </AppBar>
    )

    
    return (
        <Box sx={{ flexGrow: 1 }}>
            {isMobile &&
                <AppBar position="static" className='pt-2' style={{ height: '80px', backgroundColor: '#01004c' }}>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems="center">
                        <img
                            onClick={() => handleNavigation('/home')}
                            src={logo.src} alt="Logo"
                            width={60} height={70}
                            style={{ maxHeight: 80, objectFit: 'cover', borderRadius: 10, cursor: 'pointer', padding: 10 }}
                        />
                        <Search className=''>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Procurar..."
                                inputProps={{ 'aria-label': 'search' }}
                            />

                        </Search>
                        <Button onClick={() => handleNavigation('/pesquisa')} variant="outlined" size='small' className='text-[#fff] border-[#fff] mr-5 pt-1'>Buscar</Button>

                    </Box>
                </AppBar>
            }

            {isMobile ?
                mobileMenu
                :
                desktopMenu
            }
            {renderMobileMenu}
            {renderMenu}
        </Box >
    );
}
