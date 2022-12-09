export const getTaskById = async (id) => {
  const responseTasks = await fetch(`http://localhost:3001/tasks/${id}`)
  return responseTasks.json()
}

export const getAllTaskByPeople = async (id) => {
  const responseTasks = await fetch(`http://localhost:3001/tasks?personId=${id}`)
  return responseTasks.json()
}

export const putTask = async (id, body) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  return response.json()
}

export const postTask = async (body) => {
  const response = await fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  return response.json()
}
