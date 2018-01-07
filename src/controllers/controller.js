
/**
 * Base Controller class
 */
class Controller {

  /**
   * Response with error
   * @param {*} res Express response Object
   * @param {*} err Error object
   */
  errorResponse(res, err) {
    res.status(err.status).json({
      title: err.title,
      status: err.status,
      code: err.code
    });
  }
}

export default Controller;