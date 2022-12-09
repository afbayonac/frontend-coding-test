import { postPeople } from '../../../services/people'

export default async function userHandler (req, res) {
  const {
    method
  } = req

  if (method === 'POST') {
    const body = JSON.parse(req.body)
    const tasks = await postPeople(body)

    res.status(200).json(tasks)
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
