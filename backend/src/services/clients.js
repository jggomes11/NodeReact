const { InternalError } = require("../utils/errors");

const { Clients, Vehicles, States } = require("../database/models");

module.exports = {
  /**
   * @description Get all clients
   * @returns {Promise.<Array>}
   */
  all: async function () {
    const clients = await Clients.findAll({
      include: [
        {
          model: Vehicles,
          through: { attributes: ["id"] },
        },
        {
          model: States,
        },
      ],
    }).catch((err) => {
      throw new InternalError(err);
    });
    return clients;
  },
  /**
   * @description Get one client
   * @param   {Number}            id    Client's id
   * @returns {Promise.<Array>}
   */
  one: async function (id) {
    const clients = await Clients.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Vehicles,
          through: { attributes: ["id"] },
        },
        {
          model: States,
        },
      ],
    }).catch((err) => {
      throw new InternalError(err);
    });
    return clients;
  },
  /**
   * Find or Create a Driver Order Association
   * @param   {Object}    data              Data to be related
   * @param   {Number}    data.driverId     Driver's id
   * @param   {Number}    data.orderId      Order's id
   * @param   {String}    data.vehicle      DriversOrder's vehicle
   * @param   {String}    data.invoice      DriversOrder's  invoice
   * @param   {String}    data.company      DriversOrder's  company
   * @param   {String}    data.reason       DriversOrder's  reason
   * @returns {Promise.<Object>}
   */
  create: async function (data) {
    const driverOrder = await Clients.create(data).catch((err) => {
      throw new InternalError(err);
    });

    return driverOrder.dataValues;
  },
  /**
   * Update a Driver Order Association
   * @param   {Object}    data                  Data to be related
   * @param   {Date}      data.dateEntry        DriversOrder's dateEntry
   * @param   {Date}      data.dateExit         DriversOrder's dateExit
   * @param   {Date}      data.authEntryId      DriversOrder's authEntryId
   * @param   {Date}      data.authExitId       DriversOrder's authExitId
   * @param   {String}    data.status           DriversOrder's status
   * @param   {String}    data.invoice          DriversOrder's invoice
   * @param   {String}    data.company          DriversOrder's company
   * @param   {String}    data.vehicle          DriversOrder's vehicle
   * @param   {String}    data.licensePlate     DriversOrder's licensePlate
   * @param   {Number}    data.driverId         Driver's id
   * @param   {Number}    data.orderId          Order's id
   * @param   {String}    data.authId           DriversOrder check's auth Id
   * @param   {String}    data.authReason       DriversOrder check's auth Reason
   * @returns {Promise.<Object>}
   */
  update: async function (data) {
    const { id, ...rest } = data;
    await Clients.update(rest, {
      returning: true,
      where: { id },
    }).catch((err) => {
      throw new InternalError(err);
    });
  },
  /**
   * Delete a car
   * @param   {Number}    id              Data to be related
   * @returns {Promise.<Number>}
   */
  delete: async function (id) {
    const status = await Clients.destroy({
      where: {
        id,
      },
    }).catch((err) => {
      throw new InternalError(err);
    });

    return status;
  },
};
