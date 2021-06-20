import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Summary from './Summary';

const useStyles = makeStyles((theme) => ({
  container: {
      marginTop: '150px',
      width: '75vw',
      marginLeft: "250px"
  }
}));

export default function Checkout() {
  const classes = useStyles();

  return (
      <Grid container spacing={5} className={classes.container}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Payment API</Paper>
        </Grid>
        <Grid item xs={6}>
          <Summary  />
        </Grid>
      </Grid>
  );
}

