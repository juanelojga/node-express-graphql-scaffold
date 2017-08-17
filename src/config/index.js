const fs = require('fs');

require('dotenv').config()

require.extensions['.graphql'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

module.exports = {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "secret",
    database: process.env.DB_NAME || "node_api",
    host: process.env.DB_HOST || "localhost",
    dialect: 'mysql',
    logging: console.log,
    bodyLimit: process.env.PORT || "50Mb",
};