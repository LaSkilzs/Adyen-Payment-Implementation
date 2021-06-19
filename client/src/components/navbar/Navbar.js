import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

function pxToRem(value) {
  return `${value / 16}rem`;
}

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  breakpoints,
  overrides: {
    MuiTypography: {
      h4: {
        fontSize: pxToRem(32),
        margin: "auto",
        [breakpoints.up("sm")]: {
          fontSize: pxToRem(48),
          margin: 0
        }
      }
    },
    MuiToolbar:{
       root:{
           display: 'flex',
           justifyContent: 'space-between'
       }
    },
    MuiButton:{
        label:{
            display: 'flex',
            flexDirection: 'column'
        }
    }
  }
});

const Navbar = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary" style={{ marginBottom: 10 }}>
        <Toolbar>
          <Typography variant="h4" color="inherit">
            Products
          </Typography>
        <Button color="inherit" > <ShoppingCart fontSize='large'/> Cart</Button>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
};

export default Navbar;








 

