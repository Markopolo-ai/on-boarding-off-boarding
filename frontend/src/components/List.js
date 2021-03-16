import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "./ListItem";
import styled from "styled-components";
import useSWR from "swr";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

const Input = styled.div`
  input {
    width: 601px;
    height: 56px;
    border: none;
    color: white;
    font-size: 25px;
    background: #174674;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 10px;
  }
  input:focus {
    border: none;
    border-radius: 10px;
  }
`;

export default function List() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("http://localhost:8001/api/products", fetcher);
  if (error)
    return (
      <Grid container justify="center">
        Ops!.. failed to load
      </Grid>
    );
  if (!data)
    return (
      <Grid container justify="center">
        <CircularProgress></CircularProgress>
      </Grid>
    );

  let timeout = 0;
  const handleChange = (e) => {
    e.preventDefault();

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setValue(e.target.value);
    }, 500);
  };

  return (
    <div className={classes.root}>
      <Input>
        <input type="text" onChange={handleChange} placeholder="Search"></input>
      </Input>
      <Grid container justify="center" spacing={1}>
        {data
          .filter(function (item) {
            if (!value) return true;
            if (item.title.toLowerCase().includes(value.toLowerCase())) {
              return true;
            }
          })
          .map((item) => (
            <Grid list>
              <ListItem key={item.id} listItem={item}></ListItem>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
