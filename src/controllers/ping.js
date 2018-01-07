import { version } from '../../package.json';

/**
 * Ping the API
 */
class Ping {
  /**
   * Handle the incoming request
   * @param {*} req Express Request Object
   * @param {*} res Express Response Object
   */
  handle(req, res) {
    res.json({
			"version": version,
			"status": "online",
			"date": new Date
		});
  }

}

export default Ping;