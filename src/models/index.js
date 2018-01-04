'use strict';

import sequelize from '../sequelize'
import User from './user'

function sync (...args) {
  return sequelize.sync(...args)
}

export default { sync }

export {
  User
}
