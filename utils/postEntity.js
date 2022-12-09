export const postEntiy = async (entity, body) => {
  try {
    const response = await fetch(`/api/${entity}/`, {
      method: 'POST',
      body: JSON.stringify(body)
    })

    if (response.status !== 200) throw new Error()
    return true
  } catch (e) {
    return false
  }
}
