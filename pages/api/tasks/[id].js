import { isBeforeToday } from "../../../utils/utils"

export default async function userHandler (req, res) {
  const {
    query: { id },
    method
  } = req

  if (method === 'PUT') {
    const response = await fetch(`http://localhost:3001/tasks/${id}`)
    const task = await response.json()
    const body = JSON.parse(req.body)

    if (
      Object.hasOwn(body, 'completed') &&
      body.completed === false &&
      task.endDate !== null &&
      task.endDate !== undefined &&
      isBeforeToday(new Date(task.endDate))
    ) {
      console.log('isBeforeToday')
      return res.status(400).json({ message: 'error' })
    }

    console.log(body)

    const responsePUT = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...task,
        ...body
      })
    })

    const profilePUT = await responsePUT.json()

    console.log(profilePUT)
    res.status(200).json(profilePUT)
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
