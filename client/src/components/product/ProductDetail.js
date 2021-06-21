import React from "react";
import { Grid } from "@material-ui/core";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

import { Link } from 'react-router-dom';


const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  breakpoints,
  overrides: {
    MuiGrid: {
      root: {
        width: '50vw',
        marginTop: '20px'


      }
    },
    MuiCard: {
      root: {
        margin: "auto",
        maxWidth: "20rem",
        height: "30rem",
        padding: 10,
        [breakpoints.up("sm")]: {
          margin: 0,
          maxWidth: "50vw"
        }
      }
    }
  }
});


const ProductDetail = props => {
  const {product} = props.location.state;

  console.log(product)
  function FormRow() {
    return (
      <React.Fragment>
          <Grid container>
            <MuiThemeProvider theme={theme}>
                <Grid style={{ display: 'flex', flexDirection: 'column' }}item xs={12} sm={6}> <img src={product.image} alt="product"/> </Grid>
                <Grid style={{ display: 'flex', flexDirection: 'column', padding: '10px' }} item xs={12} sm={6}>
                    <div style={{ paddingTop: '30px'}} >
                        <h3 style={{fontSize: '2.5em', color: '#3F51B5'}}>Product: <span style={{fontSize: '0.75em', color: '#000'}}> {product.title} </span> </h3> 
                        <h3 style={{fontSize: '1.5em', color: '#3F51B5'}} >Price: <span style={{fontSize: '0.75em', color: '#000'}} >{product.price}</span></h3>
                        <h5 style={{fontSize: '1.5em', color: '#3F51B5'}}>Description: <p style={{fontSize: '0.5em', color: '#000'}}>{product.description} </p></h5>
                    </div>
                    <div>
                        <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                            <button style={{textDecoration: 'none', background: '#3F51B5', color: '#fff', paddingTop: '10px', paddingBottom: '10px'}} >Back To Products</button>
                        </Link>
                        <Link to="/cart" style={{textDecoration: 'none', color: 'white', marginLeft: '10px'}}>
                            <button style={{textDecoration: 'none', background: '#3F51B5', color: '#fff', paddingTop: '10px', paddingBottom: '10px'}} >Add To Cart</button>
                        </Link>
                    </div>
                </Grid>
            </MuiThemeProvider>
            </Grid>
      </React.Fragment>
    );
  };

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      style={{ flexGrow: 1, margin: "auto", marginTop: 80, maxWidth: "90vw" }}
    >
      <FormRow />
    </Grid>
  );
  }

  export default ProductDetail;
