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
  const CLIENTS = sequelize.define(
    "Clients",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING(15),
        validate: {
          isIn: [["PESSOA JURÍDICA", "PESSOA FÍSICA"]],
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      exName: {
        type: DataTypes.STRING(100),
      },
      document: {
        type: DataTypes.STRING(30),
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(50),
      },
      postalCode: {
        type: DataTypes.STRING(100),
      },
      street: {
        type: DataTypes.STRING(100),
      },
      houseNumber: {
        type: DataTypes.STRING(100),
      },
      city: {
        type: DataTypes.STRING(100),
      },
      scheduledAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
    }
  );

  /**
   * Associations https://sequelize.org/master/manual/assocs.html
   */
  CLIENTS.associate = function (models) {
    CLIENTS.belongsTo(models.States, {
      foreignKey: "stateId",
    });
    CLIENTS.belongsToMany(models.Vehicles, {
      through: "ClientsVehicles",
      foreignKey: "clientId",
    });
  };
  return CLIENTS;
};
