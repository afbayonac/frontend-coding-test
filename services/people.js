export const getPeopleById = async (id) => {
  const response = await fetch(`http://localhost:3001/people/${id}`)
  return response.json()
}

export const getAllPeople = async () => {
  const response = await fetch('http://localhost:3001/people')
  return response.json()
}

export const putPeople = async (id, body) => {
  const response = await fetch(`http://localhost:3001/people/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  return response.json()
}

export const postPeople = async (body) => {
  const response = await fetch('http://localhost:3001/people', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  return response.json()
}
