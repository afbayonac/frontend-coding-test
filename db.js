import db from './db.json'
import fs from 'fs/promises'

const read = async () => {
  return JSON.parse(await fs.readFile('./db.json'))
}

const write = async (db) => {
  return fs.writeFile('./db.json', JSON.stringify(db))
}

const getAll = async (entity) => {
  const db = await read()
  return db[entity] || []
}

const getById = async (entity, id) => {
  const all = await getAll(entity)
  return await all.find(e => String(e.id) === id)
}

const getAllByAttr = async (entity, name, value) => {
  const all = await getAll(entity)
  return await all.filter(e => String(e[name]) === value) || []
}

const post = async (entity, body) => {
  const db = await read()
  const all = db[entity] || []

  const id = all.reduce((acc, cur) => cur.id >= acc ? cur.id : acc, 0) + 1

  const post = { ...body, id }

  fs.writeFile('./db.json', JSON.stringify())

  await write({
    ...db,
    [entity]: [
      ...db[entity],
      post
    ]
  })

  return post
}

const put = async (entity, id, body) => {
  const db = await read()

  const put = { ...body, id }

  fs.writeFile('./db.json', JSON.stringify())

  console.log('save', put)
  await write({
    ...db,
    [entity]: db[entity].map(e => String(e.id) === id ? put : e)
  })

  return put
}

export {
  getAll,
  getById,
  getAllByAttr,
  post,
  put
}

export default db
