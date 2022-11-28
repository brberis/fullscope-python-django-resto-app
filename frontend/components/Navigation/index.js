import React , { useState } from 'react';
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
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
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from "../../utils/queries";


const publicPages = [{name: 'How it Works', link:'/how-it-works'}, 
               {name: 'Pricing', link:'/pricing'}]

const privatePages = [{name: 'My Collection', link:'/collection'}, 
               {name: 'Create', link:'/creations'}]


function ResponsiveAppBar() {
  const { data: userData } = useQuery(QUERY_ME);

  const settings = [ 'Account', 'Dashboard'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static"className='gradient'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FilterDramaIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color:lightBlue }}
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
            Ai-Dream
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
            {Auth.loggedIn() ?  privatePages.map((page) => (
                  <MenuItem key={page.name} component={Link} to={page.link} >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                  )):''}
            {!Auth.loggedIn() ?  publicPages.map((page) => (
                <MenuItem  key={page.name} component={Link} to={page.link}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>               
                )):''}
            
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
            Ai-Dream
          </Typography>
          <Box justifyContent="flex-end" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mr: 7}}>
          {!Auth.loggedIn() ?  
            <>
              <Button
                component={Link} to='/how-it-works'
                sx={{ my: 2, color: "white", display: "block" }}
              >
                How it Works
              </Button>
              <Button
                component={Link} to='/pricing'
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Pricing
              </Button>
              </>
          :''}

          {Auth.loggedIn() ?  
            <>
              <Button
                component={Link} to='/collection'
                sx={{ my: 2, color: "white", display: "block" }}
              >
                My Collection
              </Button>
              <Button
                component={Link} to='/creations'
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Create
              </Button>
              </>
          :''}
          
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            { Auth.loggedIn() ? (
              <div>
                  <MenuItem key="username">
                    <Typography textAlign="center">{userData?.me.username.toUpperCase()}</Typography>
                  </MenuItem>

                  <MenuItem key="credits">
                    <Typography textAlign="center">Total credits: {userData?.me.credits}</Typography>
                  </MenuItem>

                  <MenuItem key="buy" >
                    <Typography component={Link} to='/add-credits' textAlign="center" className="no-deco">Add credits</Typography>
                  </MenuItem>

                  <MenuItem key="logout" href="/" onClick={() => Auth.logout()}>
                    <Typography textAlign="center">Sign-out</Typography>
                  </MenuItem>
              </div>
            ):
              <div>
                  <MenuItem key="Sign-In"  component={Link} to="/sign-in" >
                    <Typography textAlign="center">Sign-In</Typography>
                  </MenuItem>
                  <MenuItem key="Sign-Up" component={Link} to="/sign-up" >
                    <Typography textAlign="center">Sign-Up</Typography>
                  </MenuItem>
              </div>
            }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;