import React from "react";
import { Grid } from "@material-ui/core";
import SampleImage  from "../../images/Sample_Image.jpg"

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
    }
  }
});


const ProductDetail = product => {
  function FormRow() {
    return (
      <React.Fragment>
        <div> <h1> Product Detail </h1></div>
          <Grid container>
            <MuiThemeProvider theme={theme}>
                <Grid item xs={12} sm={8}> <img src={SampleImage} alt="product"/> </Grid>
                <Grid item xs={12} sm={4}>
                    <div>
                        <h3>Product: FUTURE PRODUCT Detail</h3> 
                        <h3>Price: Product Price</h3>
                        <h5>Description: Product Description</h5>
                    </div>
                    <div>
                        <button>Back To Products</button>
                        <button>Add To Cart</button>
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
