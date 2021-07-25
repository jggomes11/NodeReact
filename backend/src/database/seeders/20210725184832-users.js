/**
 * Sequelize's doc
 * https://sequelize.org/master/
 */
module.exports = {
  /**
   * Do seed
   * @param {QueryInterface}  queryInterface    Sequelize's query interface
   * @param {Sequelize}       Sequelize         Sequelize instance
   * @returns {Promise.<Object|Number>}
   */
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@admin.com.br",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  /**
   * Undo seed
   * @param {QueryInterface}  queryInterface    Sequelize's query interface
   * @param {Sequelize}       Sequelize         Sequelize instance
   * @returns {Promise.<Number>}
   */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
