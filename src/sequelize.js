'use strict';

import Sequelize from 'sequelize';
import { databaseUrl } from './config';

let options = {
  logging: null
}

const sequelize = new Sequelize(databaseUrl, options)

export default sequelize