import Sequelize from 'sequelize'
import * as options from './config'

const sequelize = new Sequelize(options)

export default sequelize
