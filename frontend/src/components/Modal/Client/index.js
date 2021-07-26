import React, { useState } from "react";
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

export default function FormClient(props) {
  const { open, onClose, onSubmit, selectedClient, states, title } = props;
  const classes = useStyles();

  console.log(selectedClient);
  const [name, setName] = useState(
    selectedClient.id ? selectedClient.name : ""
  );
  const [exName, setExName] = useState(
    selectedClient.id ? selectedClient.exName : ""
  );
  const [type, setType] = useState(
    selectedClient.id ? selectedClient.type : ""
  );
  const [email, setEmail] = useState(
    selectedClient.id ? selectedClient.email : ""
  );
  const [active, setActive] = useState(
    selectedClient.id ? selectedClient.active : ""
  );
  const [radios, setRadios] = useState({
    active: selectedClient.active,
    inactive: !selectedClient.active,
  });
  const [document, setDocument] = useState(
    selectedClient.id ? selectedClient.document : ""
  );
  const [phone, setPhone] = useState(
    selectedClient.id ? selectedClient.phone : ""
  );
  const [state, setState] = useState(
    selectedClient.id ? selectedClient.State : []
  );
  const [postalCode, setPostalCode] = useState(
    selectedClient.id ? selectedClient.postalCode : ""
  );
  const [street, setStreet] = useState(
    selectedClient.id ? selectedClient.street : ""
  );
  const [houseNumber, setHouseNumber] = useState(
    selectedClient.id ? selectedClient.houseNumber : ""
  );
  const [city, setCity] = useState(
    selectedClient.id ? selectedClient.city : ""
  );
  const [date, setDate] = useState(
    selectedClient.id ? getDate(selectedClient.scheduledAt) : ""
  );
  const [time, setTime] = useState(
    selectedClient.id ? getTime(selectedClient.scheduledAt) : ""
  );

  // Errors

  const [errors, setErrors] = useState({
    name: false,
    exName: false,
    type: false,
    email: false,
    active: false,
    radios: false,
    document: false,
    phone: false,
    state: false,
    postalCode: false,
    street: false,
    houseNumber: false,
    city: false,
    date: false,
    time: false,
    vehicles: false,
  });

  const [vehicles, setVehicles] = useState({
    truck: {
      id: 1,
      name: "Caminhão",
      checked: false,
    },
    car: {
      id: 2,
      name: "Carro",
      checked: false,
    },
    motor: {
      id: 3,
      name: "Moto",
      checked: false,
    },
  });

  const handleName = (e) => {
    setName(e);
  };

  const handleExName = (e) => {
    setExName(e);
  };

  const handleType = (e) => {
    setType(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handleSetActive = (e) => {
    setActive(e === "true");
  };

  const handleSetDocument = (e) => {
    setDocument(rmvCpfCnpjMask(e));
  };

  const handleSetPhone = (e) => {
    setPhone(e);
  };

  const handleSetState = (e) => {
    setState(e);
  };
  const handleSetPostalCode = (e) => {
    setPostalCode(e);
  };

  const handleSetStreet = (e) => {
    setStreet(e);
  };

  const handleSetHouseNumber = (e) => {
    setHouseNumber(e);
  };

  const handleSetCity = (e) => {
    setCity(e);
  };

  const handleSetDate = (e) => {
    setDate(e);
  };

  const handleSetTime = (e) => {
    setTime(e);
  };

  const handleErrors = () => {
    const errs = {
      name: name.length === 0 ? true : false,
      exName: exName.length === 0 ? true : false,
      type: type.length === 0 ? true : false,
      email: email.length === 0 ? true : false,
      active: active.length === 0 ? true : false,
      document: document.length === 0 ? true : false,
      phone: phone.length === 0 ? true : false,
      state: state.length === 0 ? true : false,
      postalCode: postalCode.length === 0 ? true : false,
      street: street.length === 0 ? true : false,
      houseNumber: houseNumber.length === 0 ? true : false,
      date: date.length === 0 ? true : false,
      time: time.length === 0 ? true : false,
    };

    setErrors(errs);

    const hasErrors = Object.values(errs).filter((err) => err === true);
    console.log(hasErrors);

    if (hasErrors.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    const hasError = handleErrors();
    if (!hasError) {
      const send = {
        id: selectedClient.id,
        name,
        exName,
        type,
        email,
        active,
        document,
        phone,
        state,
        postalCode,
        street,
        houseNumber,
        city,
        date,
        time,
        preVehicles: selectedClient.Vehicles,
        selVehicles: Object.values(vehicles),
      };
      onSubmit(send);
    }
  };

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
            error={errors.name}
            value={name}
            onChange={(e) => handleName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="exName"
            label={type === "PESSOA FÍSICA" ? "Sobrenome" : "Razão Social"}
            required
            error={errors.exName}
            value={exName}
            onChange={(e) => handleExName(e.target.value)}
            fullWidth
          />
          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel id="tipo">Tipo</InputLabel>
            <Select
              labelId="tipo"
              id="tipo"
              error={errors.type}
              value={type}
              onChange={(e) => handleType(e.target.value)}
            >
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
            error={errors.email}
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
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
              error={errors.active}
              value={active}
              onChange={(e) => handleSetActive(e.target.value)}
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
            error={errors.document}
            value={
              type === "PESSOA FÍSICA"
                ? addCpfCnpjMask(document, "CPF")
                : addCpfCnpjMask(document, "CNPJ")
            }
            onChange={(e) => handleSetDocument(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Telefone"
            type="phone"
            error={errors.phone}
            value={phone}
            onChange={(e) => handleSetPhone(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="postalCode"
            label="Cep"
            error={errors.postalCode}
            value={postalCode}
            onChange={(e) => handleSetPostalCode(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Rua"
            error={errors.street}
            value={street}
            onChange={(e) => handleSetStreet(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="houseNumber"
            label="Número"
            error={errors.houseNumber}
            value={houseNumber}
            onChange={(e) => handleSetHouseNumber(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="Cidade"
            error={errors.city}
            value={city}
            onChange={(e) => handleSetCity(e.target.value)}
            fullWidth
            required
          />
          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel id="state">Estado</InputLabel>
            <Select
              labelId="state"
              id="state"
              label={state.name}
              error={errors.state}
              value={state}
              onChange={(e) => handleSetState(e.target.value)}
            >
              {states.map((st) =>
                st.id !== state.id ? (
                  <MenuItem value={st}>{st.name}</MenuItem>
                ) : (
                  <MenuItem disabled value={st}>
                    {st.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Data"
            type="date"
            error={errors.date}
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={(e) => handleSetDate(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Hora"
            type="time"
            error={errors.time}
            InputLabelProps={{
              shrink: true,
            }}
            error={errors.time}
            value={time}
            onChange={(e) => handleSetTime(e.target.value)}
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
                    checked={vehicles.truck.checked}
                    onChange={() =>
                      setVehicles({
                        ...vehicles,
                        truck: {
                          id: 1,
                          name: "Caminhão",
                          checked: !vehicles.truck.checked,
                        },
                      })
                    }
                    name="Caminhão"
                  />
                }
                label={vehicles.truck.name}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicles.car.checked}
                    onChange={() =>
                      setVehicles({
                        ...vehicles,
                        car: {
                          id: 2,
                          name: "Carro",
                          checked: !vehicles.car.checked,
                        },
                      })
                    }
                    name="Carro"
                  />
                }
                label={vehicles.car.name}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicles.motor.checked}
                    onChange={() =>
                      setVehicles({
                        ...vehicles,
                        motor: {
                          id: 3,
                          name: "Moto",
                          checked: !vehicles.motor.checked,
                        },
                      })
                    }
                    name="Moto"
                  />
                }
                label={vehicles.motor.name}
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
