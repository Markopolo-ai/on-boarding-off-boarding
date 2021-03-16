import React from "react";
import { useCart, useDispatchCart } from "../components/Cart";
import CartItem from "./CartItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
const CartView = () => {
  const classes = useStyles();
  const items = useCart();
  const dispatch = useDispatchCart();
  const totalPrice = items.reduce((total, b) => total + b.discounted_price, 0);
  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  if (items.length === 0) {
    return (
      <main>
        <p>Cart is empty</p>
      </main>
    );
  }
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Price (BDT)</TableCell>
              <TableCell align="right">Discounted Price (BDT)</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <CartItem
                handleRemove={handleRemove}
                key={index}
                product={item}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p style={{ float: "right", margin: "10px" }}>
        Total price:{" "}
        {totalPrice.toLocaleString("bd", {
          style: "currency",
          currency: "BDT",
        })}
      </p>
    </Paper>
  );
};

export default CartView;
