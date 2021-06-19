import React from 'react';
import { productData } from "../../utility/productData";
// import ProductDetail from './ProductDetail';

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  breakpoints,
  overrides: {
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
    },
    MuiTypography:{
        h1:{
            marginTop: '100px',
            fontSize: '4em'
        },
        root: {
            textAlign: "center"
        }
    },
    MuiCardMedia: {
        root:{
           padding: '50px',
        }
    }
  }
});

const Product = () => {
  function FormRow() {
    return (
      <React.Fragment>
        {productData.map(product=> {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <MuiThemeProvider theme={theme}>
                <Card>
                    <CardHeader title={product.short}/>
                    <CardMedia
                        image={product.image}
                        style={{ height: 200, width: 200, margin: "auto" }}
                    />
                    <CardContent>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h4"
                      >
                        {product.price}
                      </Typography>
                    </CardContent>
                </Card>
              </MuiThemeProvider>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  return (
      <div>
        <Typography variant="h1" component="h2"> Products</Typography>
        <Grid
            container
            spacing={4}
            justify="center"
            style={{ flexGrow: 1, margin: "auto", marginTop: 80, maxWidth: "90vw" }}
        >
            <FormRow />
        </Grid>
     </div>
  );
};

export default Product;