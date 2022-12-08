import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../../components/Layout/Layout'
import styles from './index.module.css'

// TODO: add message not found tasks

function Profile ({ profile, tasks = [] }) {
  return (
    <Layout>
      <Head>
        <title> Tanabata User edit</title>
      </Head>
      <div className={styles.profile}>
        <figure>
          <Image width={128} height={128} objectFit='cover' alt={`picture of ${profile.fullName}`} src={profile.picture} />
        </figure>
        <h1>{profile.fullName}</h1>
        <h2>{profile.nickname}</h2>
        <h2>{profile.occupation}</h2>
        <h2>{profile.age}</h2>
        <Link href={`/profile/${profile.id}/edit`}>
          <button>✎ Edit</button>
        </Link>
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
