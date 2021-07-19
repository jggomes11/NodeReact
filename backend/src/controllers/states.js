const { StatesService } = require("../services");

module.exports = {
  /**
   *
   * @param {Request}       req
   * @param {Response}      res
   * @param {NextFunction}  next
   * @returns
   */
  all: async function (req, res, next) {
    const states = await StatesService.all();
    return res.status(200).json(states);
  },
};
