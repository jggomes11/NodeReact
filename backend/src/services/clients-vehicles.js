const { Op } = require("sequelize");

const { ClientsVehicles } = require("../database/models");

module.exports = {
  /**
   * Create a ClientsVehicles's row
   * @param   {Array}     data              Data to be related
   * @returns {Promise.<Object>}
   */
  create: async function (data) {
    const clientsVehicles = await ClientsVehicles.bulkCreate(data).catch(
      (err) => {
        console.log(err);
      }
    );

    return clientsVehicles;
  },
  /**
   * Update a ClientsVehicles's row
   * @param   {Object}           vehicles            Vehicles to be deleted or created
   * @param   {Array}            vehicles.toCreate   Vehicles to be created
   * @param   {Array}            vehicles.toDelete   Vehicles to be deleted
   * @returns {Promise.<void>}
   */
  update: async function (vehicles) {
    const { toCreate, toDelete } = vehicles;
    let promises = [];

    if (toDelete.length > 0) {
      toDelete.forEach((obj) => {
        promises.push(this.delete(obj));
      });
    }
    if (toCreate.length > 0) {
      toCreate.forEach((obj) => {
        promises.push(this.create(obj));
      });
      await this.create(toCreate);
    }

    await Promise.all(promises);
  },
  /**
   * Delete a ClientsVehicles's row
   * @param   {Object}              data      ClientVehicle's data
   * @param   {Number}              data.id   ClientVehicle's id
   * @returns {Promise.<void>}
   */
  delete: async function (data) {
    const { id } = data;
    const status = await ClientsVehicles.destroy({
      where: {
        id,
      },
    }).catch((err) => {
      console.log(err);
    });
  },
};
