import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import CardTask from '../../../components/CardTask/CardTask'
import Layout from '../../../components/Layout/Layout'
import { getPeopleById } from '../../../services/people'
import { getAllTaskByPeople } from '../../../services/tasks'
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
      <ol className={styles.tasks}>
        {tasks.map(task => (
          <li key={task.id}>
            <Link href={`/tasks/${task.id}/edit`}>
              <a>
                <CardTask {...task} />
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const { id } = params
  const profile = await getPeopleById(id)
  const tasks = await getAllTaskByPeople(id)

  return {
    props: {
      profile,
      tasks
    }
  }
}

export default Profile
