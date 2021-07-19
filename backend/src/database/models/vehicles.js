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
 * 1:1 associations table
 * https://sequelize.org/master/manual/assocs.html#one-to-one-relationships
 */
module.exports = function (sequelize, DataTypes) {
  /**
   * Define a new sequelize model
   */
  const VEHICLES = sequelize.define(
    "Vehicles",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(8),
        validate: {
          isIn: [["Caminhão", "Carro", "Moto"]],
        },
      },
    },
    {
      timestamps: true,
    }
  );

  /**
   * Associations https://sequelize.org/master/manual/assocs.html
   */
  VEHICLES.associate = function (models) {
    VEHICLES.belongsToMany(models.Clients, {
      through: "ClientsVehicles",
      foreignKey: "vehicleId",
    });
  };
  return VEHICLES;
};
