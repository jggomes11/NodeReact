const jwt = require("jsonwebtoken");
const fs = require("fs");
const { sep } = require("path");

const { Users } = require("../database/models");

// Error
const { CustomError, InternalError } = require("../utils/errors");
const { AuthError } = require("../errors");

const jwtExpiration = "1d";

module.exports = {
  /**
   * Generates a token for a user
   * @param {Number} userId  User's id to add to the payload
   * @returns {Promise<*>}  Promise with jwt sign response
   */
  sign: async function (userId) {
    const payload = { id: userId };
    const options = {
      expiresIn: jwtExpiration,
    };
    const result = await jwt.sign(payload, "segredo", options);
    return result;
  },
  /**
   * Checks a token validity and if it is assigned to an user.
   * @param {String} token             Token to be verified
   * @returns {Promise<Number>}        User's id
   */
  verify: async function (token) {
    const options = {
      expiresIn: jwtExpiration,
    };

    const verifyResult = await jwt.verify(token, "segredo", options);
    let user = await Users.findOne({
      where: {
        id: verifyResult.id,
        token: token,
      },
      raw: true,
    }).catch((err) => {
      throw new InternalError(err);
    });
    if (!user) {
      throw new CustomError(AuthError.INCORRECT_PASSWORD);
    }
    return user.id;
  },
  /**
   * @param {Number} userId
   * @param {String} token
   */
  setToken: async function (userId, token) {
    const [isUpdated] = await Users.update(
      { token: token },
      {
        returning: true,
        where: { id: userId },
      }
    ).catch((err) => {
      throw new InternalError(err);
    });
  },
  /**
   * @param {Object}    data          User's data
   * @param {Number}    data.id       user's id
   * @param {String}    data.token    User's token
   * @returns {Promise.<void>}
   */
  removeToken: async function (data) {
    const [isUpdated] = await Users.update(
      { token: null },
      {
        returning: true,
        where: { id: data.id, token: data.token },
      }
    ).catch((err) => {
      throw new InternalError(err);
    });
  },
};
