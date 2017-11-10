'use strict'

import { ottoman } from './index'

module.exports = ottoman.model('User', {
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  password: 'string',
  createdAt: {
    type: 'Date', 
    default: Date.now
  }
});