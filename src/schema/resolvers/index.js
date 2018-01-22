import GraphQLDate from 'graphql-date'
import { get, set } from 'lodash'
import * as models from '../../models'
import * as utils from './utils'
import pluralize from 'pluralize'

const commonModels = [];

const resolvers = {
  Date: GraphQLDate,

  Query: {
    getPageOfUsers: (request, params) => {
      return utils.processGetPage(models.User, params)
    },
    getUser: (request, params) => {
      return utils.processGet(models.User, params)
    }
  },

  User: {
    first_name: parent => parent.first_name,
    last_name: parent => parent.last_name,
    email: parent => parent.email,
    formatted: parent => `${parent.first_name} ${parent.last_name} <${parent.email}>`
  },
}

commonModels.forEach(commonModel => {
  const Model = get(models, commonModel)

  if (Model) {
    // query
    set(resolvers, `Query.getPageOf${pluralize(commonModel)}`, (obj, args) => {
      return utils.processGetPage(Model, args)
    })
    set(resolvers, `Query.get${commonModel}`, (request, params) => utils.processGet(Model, params))

    // mutation
    set(resolvers, `Mutation.create${commonModel}`, (request, params) => utils.processCreate(Model, params))
    set(resolvers, `Mutation.update${commonModel}`, (request, params) => utils.processUpdate(Model, params))
    set(resolvers, `Mutation.remove${commonModel}`, (request, params) => utils.processDestroy(Model, params))
  }
})

export default resolvers