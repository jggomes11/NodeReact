const { CustomError } = require("../utils/errors");
const { AuthError } = require("../errors");

const TokenService = require("../services/jwt");

const whiteList = ["/api-docs", "/auth/login"];

module.exports = {
  authMiddleware: async function (req, res, next) {
    if (whiteList.some((s) => req.path.startsWith(s))) {
      return next();
    }

    // Token
    const token_header = req.headers.authorization;
    if (!token_header) {
      return next(new CustomError(AuthError.NO_TOKEN));
    }
    const userId = await TokenService.verify(token_header).catch((err) => {
      return next(err);
    });

    if (!userId) {
      return next(new CustomError(AuthError.INVALID_TOKEN));
    }

    req.user = userId;

    return next();
  },
};
