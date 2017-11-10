'use strict'

import config from './../config'
import ottoman from 'ottoman'
import couchbase from 'couchbase'

const cluster = new couchbase.Cluster(config.databaseUrl);
ottoman.bucket = cluster.openBucket(config.bucket);

module.exports = {
  ottoman: ottoman,
  cluster: cluster
}
