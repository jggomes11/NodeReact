import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

// Icon as Button
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VisibilityIcon from "@material-ui/icons/Visibility";
// Colors
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";

// Modals
import ClientModal from "../../Modal/Client";
import ViewModal from "../../Modal/Client/view";
import DeleteModal from "../../Modal/Client/delete";

// API
import {
  getAllClients,
  getAllStates,
  getAllVehicles,
  createClient,
  updateClient,
  deleteClient,
} from "../../../api";

/**
 * The human resources page
 * @returns the RH page component
 */
const ClientTable = () => {
  //   const dispatch = useDispatch();
  //   const skills = useSelector((state) => state.EmployeeSkillsReducer.skills);

  const [clients, setClients] = useState([]);
  const [states, setStates] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [updatePage, setUpdatePage] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenEdit = (row) => {
    setSelectedClient(row);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenView = (row) => {
    setSelectedClient(row);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleOpenDelete = (row) => {
    setSelectedClient(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCreate = (data) => {
    console.log("Create");

    const vehicles = data.selVehicles
      .filter((sel) => sel.checked === true)
      .map((v) => {
        return {
          id: v.id,
        };
      });

    const body = {
      client: {
        id: data.id,
        type: data.type,
        active: data.active,
        name: data.name,
        exName: data.exName,
        document: data.document,
        email: data.email,
        phone: data.phone,
        postalCode: data.postalCode,
        street: data.street,
        houseNumber: data.houseNumber,
        city: data.city,
        stateId: data.state.id,
        scheduledAt: `${data.date}T${data.time}:00.000Z`,
      },
      vehicles,
    };
    console.log(body);

    createClient(body).then((res) => {
      setUpdatePage(!updatePage);
      setOpenCreate(false);
    });
  };

  const handleUpdate = (data) => {
    let toDelete = [];
    let toCreate = [];

    toDelete = data.preVehicles
      .filter((pre) =>
        data.selVehicles.some(
          (sel) => sel.id === pre.id && sel.checked === false
        )
      )
      .map((v) => {
        return {
          id: v.ClientsVehicles.id,
          vehicleId: v.id,
          clientId: data.id,
        };
      });

    toCreate = data.selVehicles
      .filter((sel) => !data.preVehicles.some((pre) => sel.id === pre.id))
      .map((v) => {
        return {
          vehicleId: v.id,
          clientId: data.id,
        };
      });

    const body = {
      client: {
        id: data.id,
        type: data.type,
        active: data.active,
        name: data.name,
        exName: data.exName,
        document: data.document,
        email: data.email,
        phone: data.phone,
        postalCode: data.postalCode,
        street: data.street,
        houseNumber: data.houseNumber,
        city: data.city,
        stateId: data.state.id,
        scheduledAt: `${data.date}T${data.time}:00.000Z`,
      },
      vehicles: {
        toCreate,
        toDelete,
      },
    };
    updateClient(body).then((res) => {
      setUpdatePage(!updatePage);
      setOpenEdit(false);
    });
  };
  const handleDelete = (data) => {
    console.log(data);
    deleteClient(data.id).then((res) => {
      setUpdatePage(!updatePage);
      setOpenDelete(false);
    });
  };

  useEffect(() => {
    getAllClients().then((result) => {
      setClients(result);
    });
  }, [updatePage]);

  useEffect(() => {
    getAllStates().then((result) => {
      setStates(result);
    });
    getAllVehicles().then((result) => {
      console.log(result);
      setVehicles(result);
    });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Nome 2</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">
                <Tooltip title="Adicionar" aria-label="add">
                  <IconButton onClick={() => handleOpenCreate()}>
                    <AddBoxIcon style={{ color: green[700] }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.exName}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar" aria-label="edit">
                    <IconButton onClick={() => handleOpenEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Visualizar" aria-label="delete">
                    <IconButton onClick={() => handleOpenView(row)}>
                      <VisibilityIcon style={{ color: blue[700] }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir" aria-label="delete">
                    <IconButton onClick={() => handleOpenDelete(row)}>
                      <DeleteForeverIcon style={{ color: red[700] }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                {/** MODALS */}
              </TableRow>
            ))}
            {openCreate && (
              <ClientModal
                title="Adicionar Cliente"
                selectedClient={{}}
                states={states}
                open={openCreate}
                onSubmit={(data) => {
                  handleCreate(data);
                }}
                onClose={() => {
                  handleCloseCreate();
                }}
              />
            )}
            {openEdit && (
              <ClientModal
                title="Editar Cliente"
                selectedClient={selectedClient}
                states={states}
                open={openEdit}
                onSubmit={(data) => {
                  handleUpdate(data);
                }}
                onClose={() => {
                  handleCloseEdit();
                }}
              />
            )}
            {openView && (
              <ViewModal
                title="Visualizar Cliente"
                selectedClient={selectedClient}
                states={states}
                open={openView}
                onClose={() => {
                  handleCloseView();
                }}
              ></ViewModal>
            )}
            {openDelete && (
              <DeleteModal
                title="Excluir Cliente"
                selectedClient={selectedClient}
                states={states}
                open={openDelete}
                onSubmit={(data) => {
                  handleDelete(data);
                }}
                onClose={() => {
                  handleCloseDelete();
                }}
              ></DeleteModal>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientTable;
