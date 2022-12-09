import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import { useState } from 'react'
import CardProfile from '../components/CardProfile/CardProfile'
import styles from './index.module.css'
import { getAllPeople } from '../services/people'
// TODO: add message when profiles are empty
// TODO: catch server side errors

function Home ({ profiles = [] }) {
  const [sort, setSort] = useState('asc')

  function toggleSort () {
    setSort(sort === 'asc' ? 'desc' : 'asc')
  }

  return (
    <Layout>
      <div className={styles.sort}>
        <button onClick={toggleSort}>
          {sort === 'asc' ? '⭳' : '⭱'} Age
        </button>
      </div>
      <ol className={styles.list}>
        {profiles
          .sort((a, b) => sort === 'asc'
            ? a.age - b.age
            : b.age - a.age
          )
          .map(profile => (
            <li key={profile.id}>
              <Link href={`profile/${profile.id}`}>
                <a>
                  <CardProfile {...profile} />
                </a>
              </Link>
            </li>
          ))}
      </ol>
    </Layout>
  )
}

export async function getServerSideProps () {
  const profiles = await getAllPeople()

  return {
    props: {
      profiles
    }
  }
}

export default Home
