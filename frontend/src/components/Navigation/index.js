import React , { useState } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import SettingsSystemDaydreamTwoToneIcon from "@mui/icons-material/SettingsSystemDaydreamTwoTone";
import "./navigation.css"
import { lightBlue } from "@mui/material/colors";
import logo from "../../assets/images/logo.webp"



const publicPages = [{name: 'Catering Services', link:'/catering-services'}, 
               {name: 'Products', link:'/products'}, {name: 'Contact Us', link:'/contact-us'}]



function ResponsiveAppBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar position="static" className='gradient'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="img" width="200px"/>
          <FilterDramaIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color:"hsl(0, 100%, 50%)" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: 'white',
              textDecoration: "none",
              padding: "2px 0 0 0",
            }}
          >
            Tipsy Udder
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
            
            </Menu>
          </Box>
          <SettingsSystemDaydreamTwoToneIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Tipsy Udder
          </Typography>
          <Box justifyContent="flex-end" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mr: 7}}>
            <>
              <Button
                component={Link} to='/products'
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Products
              </Button>
              <Button
                component={Link} to='/catering-services'
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Catering Services
              </Button>
              </>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;