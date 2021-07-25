// Framework
const express = require("express");
const routes = express.Router();

// Application
const {
  AuthController,
  ClientsController,
  VehiclesController,
  StatesController,
} = require("./controllers");

// Auth routes
routes.post("/auth/check", AuthController.check);
routes.post("/auth/logout", AuthController.logout);
routes.post("/auth/login", AuthController.login);

// Client routes
routes.get("/client", ClientsController.all);
routes.get("/client/:id", ClientsController.one);
routes.post("/client/create", ClientsController.create);
routes.put("/client/update", ClientsController.update);
routes.delete("/client/delete/:id", ClientsController.delete);

// State route
routes.get("/states", StatesController.all);

// Vehicles route
routes.get("/vehicles", VehiclesController.all);

module.exports = routes;
