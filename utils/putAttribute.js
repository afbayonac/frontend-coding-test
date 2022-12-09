export const putAtribute = async (entity, id, value, name) => {
  try {
    const response = await fetch(`/api/${entity}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        [name]: value
      })
    })

    if (response.status !== 200) throw new Error()
    return true
  } catch (e) {
    return false
  }
}
