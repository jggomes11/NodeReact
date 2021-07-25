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
  const USERS = sequelize.define(
    "Users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notNull: {
            msg: "User's username cannot be null",
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: {
            msg: "User's password cannot be null",
          },
        },
      },
      token: {
        type: DataTypes.STRING(255),
      },
    },
    {
      timestamps: true,
      // paranoid: true, // Soft deletion (deletedAt)
    }
  );

  /**
   * Associations https://sequelize.org/master/manual/assocs.html
   */
  USERS.associate = function (models) {};
  return USERS;
};
