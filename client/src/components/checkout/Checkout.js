import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Summary from './Summary';
import Dropin from '../../utility/Dropin';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
      marginTop: '150px',
      width: '75vw',
      marginLeft: "250px"
  }
}));

const Checkout = React.forwardRef((props, ref) =>  {
  const classes = useStyles();
  console.log('ref', ref);
 
  async function checkoutUI(){
    return await Dropin.initiateCheckout();
  }
  
  return (
      <Grid container spacing={5} className={classes.container}>
        <Grid item xs={6}>
          <Button onClick={() => ref ? checkoutUI() : "Something is wrong" }> Click to Select Your Payment Option </Button>
          <div id="dropin-container" ref={ref}>
          </div> 
        </Grid>
        <Grid item xs={6}>
          <Summary  />
        </Grid>
      </Grid>
  );
})

export default Checkout;
