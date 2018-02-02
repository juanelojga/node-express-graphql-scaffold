/**
 * Class httpException
 * Used to return an http exception
 */
class HttpException extends Error {
   /**
    *
    * @param {string} title
    * @param {string} code
    * @param {number} status
    */
  constructor (title, code, status = 401) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.title = title
    this.code = code
    this.status = status
    this.name = 'httpException'
  }
}

export default HttpException
