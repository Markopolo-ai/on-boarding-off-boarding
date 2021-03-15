import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useCart } from "./Cart";
import CartView from "./CartView";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

const Nav = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
const NavItem = styled.li`
  float: right;
  border-right: 1px solid #bbb;

  a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  :last-child {
    border-right: none;
    margin-top: 10px;
    margin-right: 35px;
  }
  :first-child {
    float: left;
    border-right: none;
  }
`;

const NavBar = () => {
  const items = useCart();
  const [open, setOpen] = React.useState(false);
  const handleFullScreenBtn = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Nav>
      <NavItem>
        <a className="active" href="/">
          <img src={Logo} alt="" />
        </a>
      </NavItem>
      <NavItem>
        <IconButton onClick={handleFullScreenBtn}>
          <Badge badgeContent={items.length} color="secondary">
            <ShoppingCartIcon
              style={{ fontSize: 35, color: "#000000" }}
            ></ShoppingCartIcon>
          </Badge>
        </IconButton>
      </NavItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card>
          <CardHeader
            avatar={<h1>Your Cart</h1>}
            action={
              <IconButton onClick={handleClose}>
                <CloseIcon></CloseIcon>
              </IconButton>
            }
          />
          <CardContent>
            <Grid>
              <CartView></CartView>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </Nav>
  );
};

export default NavBar;
