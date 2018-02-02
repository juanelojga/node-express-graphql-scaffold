import Model from '../sequelize'
import DataType from 'sequelize'
import bcrypt from 'bcrypt'

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
})

User.prototype.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

export default User
