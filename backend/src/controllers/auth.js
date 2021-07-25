const HttpStatus = require("../constants/http");

const { AuthService } = require("../services");

module.exports = {
  /**
   * Function to an user login
   * @param {Object} req                  Object with data from the request made.
   * @param {Object} req.body             Object with data of the body of the request.
   * @param {String} req.body.email       User's email
   * @param {String} req.body.password    User's password
   * @param res
   * @param next
   * @returns {Promise.<{token: String, id: Number, name: String, role: Number}>}
   */
  login: async function (req, res, next) {
    const { email, password } = req.body;

    const loginData = {
      email,
      password,
    };
    const userData = await AuthService.login(loginData);

    return res.status(HttpStatus.OK).json(userData);
  },
  /**
   * Function to check an user login
   * @param {Object} req                    Object with data from the request made.
   * @param {Object} req.body               Object with data of the body of the request.
   * @param {String} req.body.id            User's id
   * @param {String} req.body.authorization Header's authorization
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  check: async function (req, res, next) {
    await AuthService.checkLogin(loginData);

    res.status(HttpStatus.OK).end();
  },
  /**
   * Function to an user logout
   * @param {Object} req                       Object with data from the request made.
   * @param {Object} req.body                  Object with data of the body of the request.
   * @param {String} req.body.id               User's id
   * @param {Object} req.headers               Object with data of the header of the request.
   * @param {String} req.headers.authorization Header's authorization
   * @param res
   * @param next
   * @returns {Promise.<{ code: String, message: String }>}
   */
  logout: async function (req, res, next) {
    const loginData = {
      id: req.body.id,
      token: req.headers.authorization,
    };

    await AuthService.logout(loginData);

    res.status(HttpStatus.OK).end();
  },
};
