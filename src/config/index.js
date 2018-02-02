/* eslint node/no-deprecated-api: 0 */

const fs = require('fs');

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = "development";
}

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

require.extensions['.graphql'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

module.exports = {
  corsHeaders: ['Link'],
  appPort: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL,
  dialect: process.env.DB_DIALECT || 'mysql',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_DATABASE || 'node_api',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  bodyLimit: process.env.BODY_LIMIT || '50mb',
  jwtSecret: process.env.JWT_SECRET,
  jwtIssuer: process.env.JWT_ISSUER
}
