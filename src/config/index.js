/* eslint node/no-deprecated-api: 0 */

const fs = require('fs')

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development'
}

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

require.extensions['.graphql'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

module.exports = {
  corsHeaders: ['Link'],
  appPort: process.env.PORT || 3001,
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_DATABASE || 'node_api',
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  logging: null,
  bodyLimit: process.env.BODY_LIMIT || '50mb',
  jwtSecret: process.env.JWT_SECRET,
  jwtIssuer: process.env.JWT_ISSUER
}
