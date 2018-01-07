import httpException from './httpException'
/**
 * Error Handler
 */
class Handler {
  /**
   * 
   * @param {*} err Exception
   * @param {*} req express request object
   * @param {*} res express response object
   */
  handle(err, req, res) {
    if (err instanceof httpException) {
      this.errorResponse(err, req, res);
      return ;
    }
    const error = new Error;
    error.status = 500;
    error.code = 'APPLICATION_ERROR';
    error.title = 'Unkown error';
    return this.errorResponse(error, req, res);
  }
  /**
   * Generic Error response
   * @param {*} err Exception
   * @param {*} req express request object
   * @param {*} res express response object
   */
  errorResponse(err, req, res) {
    res.status(err.status).json({
      title: err.title,
      status: err.status,
      code: err.code
    });
  }

}

export default Handler;