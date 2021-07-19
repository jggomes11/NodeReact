const { ClientsService, ClientsVehiclesService } = require("../services");

module.exports = {
  /**
   *
   * @param {Request}       req
   * @param {Response}      res
   * @param {NextFunction}  next
   * @returns
   */
  all: async function (req, res, next) {
    const clients = await ClientsService.all();
    return res.status(200).json(clients);
  },
  /**
   *
   * @param {Request}       req
   * @param {Response}      res
   * @param {NextFunction}  next
   * @returns
   */
  one: async function (req, res, next) {
    const { id } = req.params;

    const clients = await ClientsService.one(id);
    return res.status(200).json(clients);
  },
  /**
   *
   * @param {Request}       req
   * @param {Response}      res
   * @param {NextFunction}  next
   * @returns
   */
  create: async function (req, res, next) {
    const { client, vehicles } = req.body;

    const clientData = await ClientsService.create(client);

    const cliVehiclesToCreate = vehicles.map((vehicle) => {
      const { id } = vehicle;
      return {
        clientId: clientData.id,
        vehicleId: id,
      };
    });
    const clientVehicle = await ClientsVehiclesService.create(
      cliVehiclesToCreate
    );
    return res
      .status(200)
      .json({ client: clientData, vehicles: clientVehicle });
  },
  /**
   *
   * @param {Request}       req
   * @param {Response}      res
   * @param {NextFunction}  next
   * @returns
   */
  update: async function (req, res, next) {
    const { client, vehicles } = req.body;

    await ClientsService.update(client);

    await ClientsVehiclesService.update(vehicles);

    const updatedData = await ClientsService.one(client.id);

    return res.status(200).json(updatedData);
  },
  /**
   *
   * @param {Request}       req
   * @param {Response}      res
   * @param {NextFunction}  next
   * @returns
   */
  delete: async function (req, res, next) {
    const { id } = req.params;

    await ClientsService.delete(id);
    await ClientsVehiclesService.delete({ id });

    return res.status(200).end();
  },
};
