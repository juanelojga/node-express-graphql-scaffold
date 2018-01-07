/**
 * Class httpException
 * Used to return an http exception
 */
class httpException {
   /**
    * 
    * @param {string} title 
    * @param {string} code 
    * @param {number} status 
    */
  constructor(title, code, status = 401) {
    this.title = title;
    this.code = code;
    this.status = status;
  }

}

export default httpException;