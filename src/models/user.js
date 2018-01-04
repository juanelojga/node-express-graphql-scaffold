'use strict';

import Model from '../sequelize'
import DataType from 'sequelize'

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  uuid: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  },

  first_name: {
    type: DataType.STRING(255),
    allowNull: false
  },

  last_name: {
    type: DataType.STRING(255),
    allowNull: false
  },

  email: {
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: DataType.STRING(100),
    allowNull: true,
    defaultValue: null
  }
}, {
  underscored: true,
  tableName: 'users',
  indexes: [
    {
      fields: ['email']
    }
  ]
});

export default User;