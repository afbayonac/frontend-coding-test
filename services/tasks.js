import { getAllByAttr, getById, post, put } from '../db'

export const getTaskById = async (id) => {
  return await getById('tasks', id)
}

export const getAllTaskByPeople = async (id) => {
  return await getAllByAttr('tasks', 'personId', id)
}

export const putTask = async (id, body) => {
  return await put('tasks', id, body)
}

export const postTask = async (body) => {
  return await post('tasks', body)
}
