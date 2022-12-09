export default async function userHandler (req, res) {
  const {
    method
  } = req

  if (method === 'POST') {
    const body = JSON.parse(req.body)

    const response = await fetch('http://localhost:3001/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const tasks = await response.json()

    res.status(200).json(tasks)
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
