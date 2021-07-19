const { VehiclesService } = require("../services");

module.exports = {
  /**
   *
   * @param {Request}       req
   * @param {Response}      res
   * @param {NextFunction}  next
   * @returns
   */
  all: async function (req, res, next) {
    const vehicles = await VehiclesService.all();
    return res.status(200).json(vehicles);
  },
};
