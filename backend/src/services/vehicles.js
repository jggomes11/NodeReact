const { Vehicles } = require("../database/models");

module.exports = {
  /**
   * @description Get all vehicles
   * @returns {Promise.<Array>}
   */
  all: async function () {
    const states = await Vehicles.findAll().catch((err) => {
      console.log(err);
    });
    return states;
  },
};
