/* eslint node/no-deprecated-api: 0 */

import fs from 'fs'

require('dotenv').config()

require.extensions['.graphql'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

export const isDebug = process.env.NODE_ENV === 'development'
export const corsHeaders = ['Link']
export const port = process.env.PORT || 3001
export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite'
export const uploadsUrl = process.env.UPLOADS_URL || 'http://localhost:3001/uploads/'
export const websiteUrl = process.env.WEBSITE_URL || 'http://localhost:3000/'
export const bodyLimit = process.env.BODY_LIMIT || '50mb'