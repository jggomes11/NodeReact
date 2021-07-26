import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Components
import ClientTable from "../Tables/Client";
import Login from "../login";

//SIDE MENU ICONS
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { login, checkLogin } from "../../api";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [drawerTitle, setDrawerTitle] = useState("Login");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openClients, setOpenClients] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @param {Boolean} logged
   */
  const handleIsLogged = (logged) => {
    setIsLogged(logged);
  };

  const handleLogin = (data) => {
    const { email, password } = data;

    login({
      email,
      password,
    }).then((result) => {
      const { id, token } = result;
      localStorage.setItem("auth", JSON.stringify(token));
      localStorage.setItem("id", JSON.stringify(id));
      handleIsLogged(result);
    });
  };

  /**
   * Change page when click drawer option
   * @param {String} name   SideBarMenu option name
   */
  const handleClick = (name) => {
    setDrawerTitle(name);
    switch (name) {
      case "Cliente":
        setOpenClients(true);
        // Set all others to false
        break;
      default:
        break;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"));
    const id = JSON.parse(localStorage.getItem("id"));
    console.log("aqui");
    checkLogin({ id, token }).then((status) => {
      if (status === 200) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      setDrawerTitle("Selecione uma aba");
      setIsLoading(false);
    });
  }, []);

  /**
   * Drawer's side bar option list
   */
  const options = [
    {
      id: 1,
      name: "Cliente",
      icon: <InboxIcon />,
      onClick: <Drawer></Drawer>,
    },
    // {
    //   id: 2,
    //   name: "Adicionar",
    //   icon: <AddBoxIcon />,
    // },
    // {
    //   id: 3,
    //   name: "Visualizar",
    //   icon: <InboxIcon />,
    // },
    // {
    //   id: 4,
    //   name: "Editar",
    //   icon: <EditIcon />,
    // },
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {isLogged ? (
        <List>
          {options.map((option, index) => (
            <ListItem
              button
              key={option.id}
              onClick={() => handleClick(option.name)}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {drawerTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {isLogged ? (
          openClients ? (
            <ClientTable></ClientTable>
          ) : (
            <></>
          )
        ) : !isLoading ? (
          <Login onSubmit={handleLogin}></Login>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
