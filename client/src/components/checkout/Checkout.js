import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Summary from './Summary';
import DropDown from './DropDown';

const useStyles = makeStyles((theme) => ({
  container: {
      marginTop: '150px',
      width: '75vw',
      marginLeft: "250px"
  }
}));


export default function Checkout(props) {
  const { cartItems, total, paymentTypes } = props;
 
  const classes = useStyles();

  return (
      <Grid container spacing={5} className={classes.container}>
        <Grid item xs={6}>
          
          <Paper className={classes.paper}>  <DropDown paymentTypes={paymentTypes}/>  </Paper>
        </Grid>
        <Grid item xs={6}>
          <Summary  cartItems={cartItems} total={total} />
        </Grid>
      </Grid>
  );
}

