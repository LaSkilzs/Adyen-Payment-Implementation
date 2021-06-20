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

const TAX_RATE = 0.07;

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
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 1, 14.99),
  createRow('Paper (Case)', 1, 45.99),
  createRow('Waste Basket', 1, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Cart() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <h1 style={{ marginTop: '150px', textAlign: 'center', fontSize: '2.5em', color: '#3F51B5'}}>Cart</h1>
        <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="spanning table">
            <TableHead>
            <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Sum</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
            ))}

            <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={3} />
               
                <TableCell >Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                <TableCell align="right"> 
                <Link to="/checkout" style={{textDecoration: 'none', color: 'white'}}>
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


