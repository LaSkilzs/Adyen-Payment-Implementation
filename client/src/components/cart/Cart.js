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
import API from "../../utility/API";
import { ShortText } from '@material-ui/icons';


const useStyles = makeStyles({
  table: {
    width: '50vw',
  },
  container: {
      display: 'flex',
      justifyContent: 'center',
  }
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
};


function subtotal(items) {
  return items.map(({ price, quantity }) => price * quantity).reduce((sum, i) => sum + i, 0);
  // const sum = items.map(({ price, quantity }) => price * quantity )
  // let total = sum.reduce((acc, val) => {
  //   return acc + val;
  // });
}

function summaryTotals(cartItems){
  return cartItems.map(item => {
    return {description: item.name, price: item.price}})
}

const handleDelete = (id) => API.delete(id).then(response => response.json())

export default function Cart(props) {
  const { cartItems } = props;
  console.log('props', props)
  console.log('cartItems', cartItems)
  const classes = useStyles();

  const rows = props.cartItems.map(item => { 
    return createRow(item.name, item.quantity, parseFloat(item.price), item.id); 
  })
  const invoiceSubtotal = subtotal(props.cartItems);

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
                <TableCell align="right"><Button onClick={()=> handleDelete(row.id)}> <DeleteForeverIcon color="primary"/> </Button></TableCell>
                <TableCell align="right">{row.price}</TableCell>
                </TableRow>
            ))}

            <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={3} />
               
                <TableCell >Total</TableCell>
                <TableCell align="right">{ ccyFormat(invoiceSubtotal)}</TableCell>
                <TableCell align="right"> 
                <Link to= {{ pathname: "/checkout", state: { cartItems: summaryTotals(cartItems) , total: ccyFormat(invoiceSubtotal) }}} style={{textDecoration: 'none', color: 'white'}}>
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


