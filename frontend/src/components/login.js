import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Login(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleSubmit = () => {
    const send = {
      email,
      password,
    };
    onSubmit(send);
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <TextField
        autoFocus
        margin="dense"
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => handleEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        autoFocus
        margin="dense"
        id="password"
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => handlePassword(e.target.value)}
        fullWidth
        required
      />
      <Button
        onClick={() => {
          handleSubmit();
        }}
        color="primary"
      >
        Confirmar
      </Button>
    </div>
  );
}
