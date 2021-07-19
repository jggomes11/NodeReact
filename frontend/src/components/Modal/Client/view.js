import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { addCpfCnpjMask, rmvCpfCnpjMask } from "../../../utils/masks";
import { getDate, getTime } from "../../../utils/date";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ViewClient(props) {
  const { open, onClose, selectedClient, states, title } = props;
  const classes = useStyles();

  console.log(selectedClient);
  const [name, setName] = useState(selectedClient.name);
  const [exName, setExName] = useState(selectedClient.exName);
  const [type, setType] = useState(selectedClient.type);
  const [email, setEmail] = useState(selectedClient.email);
  const [active, setActive] = useState(selectedClient.active);
  const [radios, setRadios] = useState({
    active: selectedClient.active,
    inactive: !selectedClient.active,
  });

  const [document, setDocument] = useState(selectedClient.document);
  const [phone, setPhone] = useState(selectedClient.phone);
  const [state, setState] = useState(selectedClient.State);
  const [postalCode, setPostalCode] = useState(selectedClient.postalCode);
  const [street, setStreet] = useState(selectedClient.street);
  const [houseNumber, setHouseNumber] = useState(selectedClient.houseNumber);
  const [city, setCity] = useState(selectedClient.city);
  const [date, setDate] = useState(getDate(selectedClient.scheduledAt));
  const [time, setTime] = useState(getTime(selectedClient.scheduledAt));
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Caminhão",
      checked: true,
    },
    {
      id: 2,
      name: "Carro",
      checked: false,
    },
    {
      id: 3,
      name: "Moto",
      checked: false,
    },
  ]);

  const handleVehicles = (all, selected) => {
    let checked = selected
      .filter((pre) => all.some((sel) => sel.id === pre.id))
      .map((v) => {
        return {
          id: v.id,
          name: v.name,
          checked: true,
        };
      });

    all
      .filter((sel) => !selected.some((pre) => sel.id === pre.id))
      .forEach((v) => {
        checked.push({
          id: v.id,
          name: v.name,
          checked: false,
        });
      });

    console.log({ ...checked });
    setVehicles({ ...checked });
  };

  useEffect(() => {
    handleVehicles(vehicles, selectedClient.Vehicles);
  }, []);

  console.log(time);
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={type === "PESSOA FÍSICA" ? "Nome" : "Nome Fantasia"}
            required
            value={name}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="exName"
            label={type === "PESSOA FÍSICA" ? "Sobrenome" : "Razão Social"}
            required
            value={exName}
            fullWidth
          />
          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel id="tipo">Tipo</InputLabel>
            <Select labelId="tipo" id="tipo" value={type}>
              <MenuItem value={"PESSOA FÍSICA"}>Pessoa Física</MenuItem>
              <MenuItem value={"PESSOA JURÍDICA"}>Pessoa Jurídica</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            value={email}
            fullWidth
            required
          />
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ fontSize: "small" }}
              required
            >
              Situação
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={active}
            >
              <FormControlLabel
                id="active"
                value={true}
                control={<Radio />}
                label="Ativo"
              />
              <FormControlLabel
                id="inactive"
                value={false}
                control={<Radio />}
                label="Inativo"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="document"
            label={type === "PESSOA FÍSICA" ? "Cpf" : "Cnpj"}
            value={
              type === "PESSOA FÍSICA"
                ? addCpfCnpjMask(document, "CPF")
                : addCpfCnpjMask(document, "CNPJ")
            }
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Telefone"
            type="phone"
            value={phone}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="postalCode"
            label="Cep"
            value={postalCode}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Rua"
            value={street}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="houseNumber"
            label="Número"
            value={houseNumber}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="Cidade"
            value={city}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="Estado"
            value={state.name}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Data"
            type="date"
            defaultValue={date}
            value={date}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Hora"
            type="time"
            value={time}
            fullWidth
            required
          />
          <FormControl
            component="fieldset"
            className={classes.formControl}
            fullWidth
            required
          >
            <FormLabel component="legend" style={{ fontSize: "small" }}>
              Veículos
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicles[0].checked}
                    name={vehicles[0].name}
                  />
                }
                label={vehicles[0].name}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicles[1].checked}
                    name={vehicles[1].name}
                  />
                }
                label={vehicles[1].name}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicles[2].checked}
                    name={vehicles[2].name}
                  />
                }
                label={vehicles[2].name}
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}
