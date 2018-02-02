import fs from 'fs'
import path from 'path'
import { get, isObject, isString } from 'lodash'

export const processGetPage = async(Model, {filter, include = []}) => {
  let where = {}

  if (filter) {
    const filterParsed = JSON.parse(filter)

    if (filterParsed.ids) {
      where.id = filterParsed.ids

      delete filterParsed.ids
    }

    where = Object.assign({}, where, filterParsed)
  }

  const items = await Model.findAll({
    where,
    include
  })

  return {
    items,
    totalCount: await Model.count({where})
  }
}

export const processGet = async (Model, {id, slug, include}) => {
  const where = slug ? {slug} : {id}

  return Model.findOne({where, include})
}

export const processCreate = (Model, {data}) => {
  const parsedData = JSON.parse(data)

  return Model.create(parsedData, {include: [{all: true}]})
}

export const processUpdate = async (Model, {data}, primaryKey = 'id') => {
  const parsedData = !isObject(data) ? JSON.parse(data) : data
  const id = get(parsedData, primaryKey)
  const instance = await Model.findById(id)

  return instance.updateAttributes(parsedData)
}

export const processDestroy = (Model, {id}) => Model.destroy({where: {id}})
