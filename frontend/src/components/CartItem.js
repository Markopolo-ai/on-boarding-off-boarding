import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";

const CartItem = ({ product, index, handleRemove }) => {
  return (
    <TableRow key={product.title}>
      <TableCell component="th" scope="row">
        <img width="125" src={product.image} alt=""></img>
      </TableCell>
      <TableCell align="right">{product.title}</TableCell>
      <TableCell align="right">{product.price}</TableCell>
      <TableCell align="right">{product.discounted_price}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleRemove}>
          <CloseIcon style={{ color: "red" }}></CloseIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default CartItem;
