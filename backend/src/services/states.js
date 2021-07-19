const { States } = require("../database/models");

module.exports = {
  /**
   * @description Get all states
   * @returns {Promise.<Array>}
   */
  all: async function () {
    const states = await States.findAll().catch((err) => {
      console.log(err);
    });
    return states;
  },
};
