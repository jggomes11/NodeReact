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
  const STATES = sequelize.define(
    "States",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(19),
        validate: {
          isIn: [
            [
              "Acre",
              "Alagoas",
              "Amapá",
              "Amazonas",
              "Bahia",
              "Ceará",
              "Distrito Federal",
              "Espírito Santo",
              "Goiás",
              "Maranhão",
              "Mato Grosso",
              "Mato Grosso do Sul",
              "Minas Gerais",
              "Pará",
              "Paraíba",
              "Paraná",
              "Pernambuco",
              "Piauí",
              "Rio de Janeiro",
              "Rio Grande do Norte",
              "Rio Grande do Sul",
              "Rondônia",
              "Roraima",
              "Santa Catarina",
              "São Paulo",
              "Sergipe",
              "Tocantins",
              "Distrito Federal",
            ],
          ],
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
  STATES.associate = function (models) {};
  return STATES;
};
