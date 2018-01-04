/* eslint node/no-deprecated-api: 0 */

import fs from 'fs'

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

require.extensions['.graphql'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

export const corsHeaders = ['Link']
export const port = process.env.PORT || 3001
export const databaseUrl = process.env.DATABASE_URL
export const bodyLimit = process.env.BODY_LIMIT || '50mb'
export const jwtSecret = process.env.JWT_SECRET
export const jwtIssuer = process.env.JWT_ISSUER