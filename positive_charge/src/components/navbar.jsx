import * as React from 'react';
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
import MuiLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const theme = createTheme({
  palette: {
    signup: {
      main: '#FFFFFF'
    }
  }
})
const pages = ['Find a Charger'];
const settings = ['Activity', 'Account', 'Logout'];

const ResponsiveAppBar = ({ isLoggedIn, logOut }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { data } = location.state;

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

  const handleClickHome = () => {
    handleCloseNavMenu()
    navigate('/');
  }

  const handleLogin = () => {
    navigate('/login');
    handleCloseUserMenu()
  }

  const handleSignup = () => {
    navigate('/signup');
    handleCloseUserMenu()
  }

  const logDisplay = () => {
    // console.log(data);
    if (!isLoggedIn) {
      return (
        <>
          <Grid container display="flex" direction="column" justifyContent="flex-end">
            <Grid container item direction="row" xs={6} justifyContent="center">
              <Button onClick={handleLogin} sx={{ color: 'white', fontSize: '10px', fontWeight: '600' }}>Login</Button>
            </Grid>
            <Grid container item xs={6} justifyContent="center">
              <ThemeProvider theme={theme}>
                <Button variant="outlined" color='signup' onClick={handleSignup} sx={{ color: 'white', fontSize: '10px', fontWeight: '600' }}>Sign Up</Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </>
      )
    } else {
      return (
        // <Button onClick={logOut} sx={{ my: 2, color: 'white', display: 'block' }}>Log Out</Button>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  // alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                  sx={{ bgcolor: '#11730a' }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? (handleCloseUserMenu, logOut) : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      )
    }
    return null;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="toolbar">
          <Grid container display="flex" direction="row">
            <Grid container item xs={ 3 }>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={page === 'Find a Charger' ? handleClickHome : handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
            <Grid container item xs={ 6 } justifyContent="center">
              <Container id="logo"
                component="img"
                alt="logo"
                src="/img/posChargeWht_medium.png"
                onClick={() => handleClickHome()}
              >
              </Container>
            </Grid>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Grid container={ true } item xs={ 3 } justifyContent="flex-end" alignContent="center">
              {logDisplay()}
            </Grid>

          </Grid>


        </Toolbar>
      </Container>
    </AppBar>

  );
};
export default ResponsiveAppBar;
