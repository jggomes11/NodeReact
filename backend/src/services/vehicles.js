const { InternalError } = require("../utils/errors");

const { Vehicles } = require("../database/models");

module.exports = {
  /**
   * @description Get all vehicles
   * @returns {Promise.<Array>}
   */
  all: async function () {
    const states = await Vehicles.findAll().catch((err) => {
      throw new InternalError(err);
    });
    return states;
  },
};
