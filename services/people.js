import { getAll, getById, post, put } from '../db'

export const getPeopleById = async (id) => {
  return await getById('people', id)
}

export const getAllPeople = async () => {
  return await getAll('people')
}

export const putPeople = async (id, body) => {
  return await put('people', id, body)
}

export const postPeople = async (body) => {
  return await post('people', body)
}
