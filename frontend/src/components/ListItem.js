import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Modal from "@material-ui/core/Modal";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import IconButton from "@material-ui/core/IconButton";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import { useDispatchCart } from "./Cart";

const useStyles = makeStyles({
  root: {
    width: "250px",
    height: "300px",
    textAlign: "center",
    margin: "10px",
    background:
      "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.6715) 98.67%)",
    borderShadow: "0px 1px 17px rgba(0, 0, 0, 0.13)",
    borderRadius: "25px",
  },

  title: {
    fontSize: 12,
    fontWeight: "Bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",
    color: "#174674",
  },
  pos: {
    marginBottom: 12,
  },
  subtitle: {
    whiteSpace: "nowrap",
  },
  image: {
    width: "100px",
    height: "120px",
  },
});

export default function ListItem(props) {
  const classes = useStyles();
  const { title, image, price, discounted_price } = props.listItem;
  const [open, setOpen] = React.useState(false);
  const handleFullScreenBtn = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const dispatch = useDispatchCart();

  const addToCart = (e) => {
    e.preventDefault();
    const item = {
      title,
      image,
      price,
      discounted_price,
    };
    dispatch({ type: "ADD", item });
    console.log("added", item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <IconButton onClick={handleFullScreenBtn}>
            <FullscreenIcon style={{ color: "#FA8907" }}></FullscreenIcon>
          </IconButton>
        }
        action={
          <IconButton onClick={addToCart}>
            <LocalMallIcon style={{ color: "#174674" }}></LocalMallIcon>
          </IconButton>
        }
      />
      <CardContent>
        <img className={classes.image} src={image} alt=""></img>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          {discounted_price === price ? (
            <span>Not available</span>
          ) : (
            <span className={classes.subtitle}>
              Price:{" "}
              <span style={{ textDecoration: "line-through" }}>{price}</span>{" "}
              {discounted_price} BDT
            </span>
          )}
        </Typography>
      </CardContent>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card>
          <CardHeader
            action={
              <IconButton onClick={handleClose}>
                <CloseIcon></CloseIcon>
              </IconButton>
            }
          />
          <CardContent>
            <Grid container justify="center">
              <Grid>
                <Typography>{title}</Typography>
                <img src={image} width="500" height="700" alt=""></img>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </Card>
  );
}
