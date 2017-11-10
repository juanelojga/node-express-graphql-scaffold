'use strict'

import fs from 'fs';

require('dotenv').config()

require.extensions['.graphql'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

module.exports = {
    databaseUrl: process.env.DB_URL || "couchbase://127.0.0.1",
    bodyLimit: process.env.BODY_LIMIT || "50Mb",
    bucket: process.env.DB_BUCKET || 'development'
};