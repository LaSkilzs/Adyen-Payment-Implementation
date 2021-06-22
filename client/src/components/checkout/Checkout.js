import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Summary from './Summary';
import Dropin from '../../utility/Dropin';

const useStyles = makeStyles((theme) => ({
  container: {
      marginTop: '150px',
      width: '75vw',
      marginLeft: "250px"
  }
}));

const Checkout = React.forwardRef((props, ref) =>  {
  
  const { cartItems, total } = props;
  const classes = useStyles();
  console.log('ref', ref);
  console.log('checkout', Dropin.initiateCheckout());
  ref ? Dropin.initiateCheckout() :  console.log('ref', ref);
  return (
      <Grid container spacing={5} className={classes.container}>
        <Grid item xs={6}>
          <h3>Select your payment option</h3>
          <div id="dropin-container" ref={ref}>
          </div> 
        </Grid>
        <Grid item xs={6}>
          <Summary  cartItems={cartItems} total={total} />
        </Grid>
      </Grid>
  );
})

export default Checkout;
