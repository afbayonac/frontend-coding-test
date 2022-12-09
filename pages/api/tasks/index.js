import { postTask } from '../../../services/tasks'
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

    const tasks = await postTask(body)

    res.status(200).json(tasks)
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
