import DataType from 'sequelize'
import bcrypt from 'bcrypt-nodejs'
import Model from '../sequelize'

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  uuid: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1
  },

  email: {
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  name: {
    type: DataType.STRING(255),
    allowNull: false
  },

  password: {
    type: DataType.STRING(100),
    allowNull: true,
    defaultValue: null,
    set (password) {
      if (password) {
        this.setDataValue('password', this.generateHash(password))
      }
    }
  }

}, {
  paranoid: true,
  indexes: [
    {
      fields: ['email'],
    }
  ],
  instanceMethods: {
    generateHash (password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    },
    validPassword (password) {
      return bcrypt.compareSync(password, this.password)
    }
  }
})

export default User