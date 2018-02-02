/**
 * Class httpException
 * Used to return an http exception
 */
class validationException {
  /**
   * 
   * @param {string} title 
   * @param {string} code
   * @param {object} errors
   * @param {number} status 
   */
 constructor(title, code, errors, status = 422) {
   this.title = title;
   this.code = code;
   this.errors = errors;
   this.status = status;
 }

}

export default validationException;