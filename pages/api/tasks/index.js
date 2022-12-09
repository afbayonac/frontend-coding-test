import { isBeforeToday, isEndDate } from '../../../utils/utils'

export default async function userHandler (req, res) {
  const {
    method
  } = req

  if (method === 'POST') {
    const body = JSON.parse(req.body)

    if (
      Object.hasOwn(body, 'endDate') &&
      body.completed === false &&
      isEndDate(body.endDate) &&
      isBeforeToday(body.endDate)
    ) {
      body.completed = true
    }

    const response = await fetch('http://localhost:3001/tasks', {
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
