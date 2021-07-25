const { CustomError } = require("../utils/errors");

module.exports = {
  errorMiddleware: function (err, req, res, next) {
    if (err instanceof CustomError) {
      return res.status(err.status).json(err.getResponseJsonObject());
    }
  },
};
