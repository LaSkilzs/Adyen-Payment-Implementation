import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles({
  table: {
    width: '50vw',
  },
  container: {
      display: 'flex',
      justifyContent: 'center',
  }
});

export default function Cart(props) {
  const classes = useStyles();

  const rows = [{desc: "Sunglasses", qty: 1, price: "$10.00" , id: 2}]; 
  
  return (
    <React.Fragment>
        <h1 style={{ marginTop: '150px', textAlign: 'center', fontSize: '2.5em', color: '#3F51B5'}}>Cart</h1>
        <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="spanning table">
            <TableHead>
            <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right">Sum</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row, i) => (
                <TableRow key={i}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right"><Button > <DeleteForeverIcon color="primary"/> </Button></TableCell>
                <TableCell align="right">{row.price}</TableCell>
                </TableRow>
            ))}

            <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{"$10.00"}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={3} />
               
                <TableCell >Total</TableCell>
                <TableCell align="right">{ "$10.00"}</TableCell>
                <TableCell align="right"> 
                <Link to= "/checkout" style={{textDecoration: 'none', color: 'white'}}>
                    <Button variant="contained" color="primary"> Continue to Checkout</Button>
                </Link>
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    </React.Fragment>
  );
}


