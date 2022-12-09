import { getTaskById, putTask } from '../../../services/tasks'
import { isBeforeToday, isEndDate } from '../../../utils/utils'

export default async function userHandler (req, res) {
  const {
    query: { id },
    method
  } = req

  if (method === 'PUT') {
    const task = await getTaskById(id)
    const body = JSON.parse(req.body)

    if (
      Object.hasOwn(body, 'completed') &&
      body.completed === false &&
      isEndDate(task.endDate) &&
      isBeforeToday(task.endDate)
    ) {
      return res.status(400).json({ message: 'error' })
    }

    if (
      Object.hasOwn(body, 'endDate') &&
      task.completed === false &&
      isEndDate(task.endDate) &&
      isBeforeToday(task.endDate)
    ) {
      body.completed = true
    }

    const taskUpdate = await putTask(id, {
      ...task,
      ...body
    })

    res.status(200).json(taskUpdate)
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
