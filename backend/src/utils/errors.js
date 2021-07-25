const HttpStatus = require("../constants/http");

/**
 * Default error class.
 *
 * @class CustomError
 * @extends {Error}
 */
class CustomError extends Error {
  constructor(error) {
    super(error.message);
    this.name =
      this.constructor.name + (error.code == undefined ? "-" + error.code : ""); // ensures that the error name will be the same as the class name

    if (error.status == undefined)
      this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    else this.status = error.status;

    this.code = error.code;
    if (error.data) this.data = error.data;

    Error.captureStackTrace(this, this.constructor); // ensures friendly error stack strace for this custom error class
  }

  getResponseJsonObject() {
    let jsonObject = {
      message: this.message,
    };

    if (this.code != undefined) jsonObject.code = this.code;
    if (this.data != undefined) jsonObject.data = this.data;

    return jsonObject;
  }
}

/**
 * This class can wrap third party modules errors, and NodeJs errors as well, by putting the entire error object inside the 'data' attribute
 *
 * @class InternalError
 * @extends {DpError}
 */
class InternalError extends CustomError {
  constructor(error) {
    super({ message: error.message }); // status isn't needed because the CustomError's constructor will assign status 500 by default
    this.data = { error };
  }
}

module.exports = {
  CustomError,
  InternalError,
};
