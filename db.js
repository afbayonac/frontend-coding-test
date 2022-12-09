import db from './db.json'
import fs from 'fs/promises'
import path from 'path'
const dbTemp = '/tmp/db.json'

const initDB = async () => {
  try {
    await fs.mkdir('/tmp')
  } catch (e) {
    console.info('Couldn\'t create tmp')
  }
  const db = JSON.parse(await fs.readFile(dbTemp))
  await fs.writeFile(dbTemp, JSON.stringify(db))
}

const read = async () => {
  return JSON.parse(await fs.readFile(dbTemp))
}

const write = async (db) => {
  const ROUTE_CACHE_PATH = path.resolve(path.join(process.cwd(), './db.json'))
  return fs.writeFile(ROUTE_CACHE_PATH, JSON.stringify(db))
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

  console.log('save:  ', put)
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

initDB()

export default db
