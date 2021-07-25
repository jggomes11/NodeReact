// Errors
const { CustomError, InternalError } = require("../utils/errors");
const { AuthError } = require("../errors");

// Services
const UsersService = require("./users");
const TokenService = require("./jwt");

module.exports = {
  /**
   *
   * @param {Object} data
   * @param {String} data.email  User's username
   * @param {String} data.password  User's password
   * @returns
   */
  login: async function (data) {
    const { email, password } = data;

    const user = await UsersService.findOne({ email });
    if (password !== user.password)
      throw new CustomError(AuthError.INCORRECT_PASSWORD);

    try {
      const token = await TokenService.sign(user.id);

      await TokenService.setToken(user.id, token);

      return { token: token, id: user.id, email: user.name };
    } catch (err) {
      throw new InternalError(err);
    }
  },
  /**
   * @param   {Object}    data        User's data
   * @param   {Number}    data.id     User's id
   * @param   {String}    data.token  User's token
   */
  logout: async function (data) {
    await TokenService.removeToken(data);
  },
  /**
   * @param   {Object}        data          User's data
   * @param   {Number}        data.id       User's id
   * @param   {String}        data.token    User's token
   * @returns {Promise<void>}
   */
  checkLogin: async function (data) {
    const { id, token } = data;

    const user = await UsersService.findOne({ id });

    if (token !== user.token) {
      throw new CustomError(AuthError.AUTH005);
    }
  },
};
