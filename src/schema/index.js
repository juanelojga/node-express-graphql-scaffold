import { makeExecutableSchema } from 'graphql-tools'

import schemaDef from './schema.graphql'

import resolvers from './resolvers/index'

const schema = makeExecutableSchema({
  typeDefs: schemaDef,
  resolvers: resolvers
});

export default schema;