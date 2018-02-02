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
  handle (err, req, res) {
    if (err.name === 'httpException') {
      this.errorResponse(err, req, res)
      return
    }
    if (err.name === 'validationException') {
      this.validationErrorResponse(err, req, res)
      return
    }
    const error = new Error()
    error.status = 500
    error.code = 'APPLICATION_ERROR'
    error.title = 'Unkown error'
    return this.errorResponse(error, req, res)
  }
  /**
   * Generic Error response
   * @param {*} err Exception
   * @param {*} req express request object
   * @param {*} res express response object
   */
  errorResponse (err, req, res) {
    res.status(err.status).json({
      title: err.title,
      status: err.status,
      code: err.code
    })
  }
  /**
   * Validation Error Response
   * @param {*} err
   * @param {*} req
   * @param {*} res
   */
  validationErrorResponse (err, req, res) {
    res.status(err.status).json({
      title: err.title,
      status: err.status,
      code: err.code,
      errors: err.errors
    })
  }
}

export default Handler
