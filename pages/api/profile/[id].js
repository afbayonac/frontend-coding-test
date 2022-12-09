import { getPeopleById, putPeople } from '../../../services/people'

export default async function userHandler (req, res) {
  const {
    query: { id },
    body,
    method
  } = req

  if (method === 'PUT') {
    const profile = await getPeopleById(id)

    const profileUpdate = await putPeople(id, {
      ...profile,
      ...JSON.parse(body)
    })

    res.status(200).json(profileUpdate)
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
