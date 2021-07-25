const { Users } = require("../database/models");

// Error
const { CustomError, InternalError } = require("../utils/errors");
const { AuthError, UsersError } = require("../errors");

const Sequelize = require("sequelize");

module.exports = {
  /**
   * Find one user by username
   * @param   {Object}    data        User's data
   * @param   {Number}    data.id     User's id
   * @param   {String}    data.email  User's email
   * @returns {Promise.<void>}
   */
  findOne: async function (data) {
    const user = await Users.findOne({
      where: {
        ...data,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
    }).catch((err) => {
      throw new InternalError(err);
    });
    if (!user) {
      throw new CustomError(AuthError.INCORRET_EMAIL);
    }
    return user;
  },
};
