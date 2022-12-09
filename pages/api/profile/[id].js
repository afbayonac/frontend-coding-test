export default async function userHandler (req, res) {
  const {
    query: { id },
    body,
    method
  } = req

  console.log(body)

  if (method === 'PUT') {
    const response = await fetch(`http://localhost:3001/people/${id}`)
    const profile = await response.json()

    const responsePUT = await fetch(`http://localhost:3001/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...profile,
        ...JSON.parse(body)
      })
    })

    const profilePUT = await responsePUT.json()

    res.status(200).json(profilePUT)
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
