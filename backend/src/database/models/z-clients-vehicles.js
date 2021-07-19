/**
 * Sequelize's doc
 * https://sequelize.org/master/
 */
const { Sequelize, DataTypes, Model } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize   Sequelize instance
 * @param {DataTypes} DataTypes   Sequelize data types
 * @returns {Model}
 * M:N associations table
 * https://sequelize.org/master/manual/advanced-many-to-many.html
 */
module.exports = function (sequelize, DataTypes) {
  /**
   * Define a new sequelize model
   */
  const CLIENTS_VEHICLES = sequelize.define(
    "ClientsVehicles",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );

  /**
   * Associations https://sequelize.org/master/manual/assocs.html
   */
  CLIENTS_VEHICLES.associate = function (models) {};
  return CLIENTS_VEHICLES;
};
