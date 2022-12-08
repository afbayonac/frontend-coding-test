import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../../components/Layout/Layout'

// TODO: add message not found tasks

function Profile ({ profile, tasks = [] }) {
  return (
    <Layout>
      <Head>
        <title> Tanabata User edit</title>
      </Head>
      <div>
        <h1>{profile.fullName}  {profile.age} {profile.occupation} {profile.picture}</h1>
        <Link href={`/profile/${profile.id}/edit`}>Edit</Link>
      </div>
      <ol>
        {tasks.map(task => (
          <li key={task.id}>
            <Link href={`/tasks/${task.id}/edit`}>{task.title}</Link>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const { id } = params
  const responseProfile = await fetch(`http://localhost:3001/people/${id}`)
  const profile = await responseProfile.json()

  const responseTasks = await fetch(`http://localhost:3001/tasks?personId=${id}`)
  const tasks = await responseTasks.json()

  return {
    props: {
      profile,
      tasks
    }
  }
}

export default Profile
