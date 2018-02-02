/**
 * Class ValidationException
 * Used to return an http exception
 */
class ValidationException extends Error {
  /**
   *
   * @param {string} title
   * @param {string} code
   * @param {object} errors
   * @param {number} status
   */
  constructor (title, code, errors, status = 422) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.title = title
    this.code = code
    this.errors = errors
    this.status = status
    this.name = 'validationException'
  }
}

export default ValidationException
