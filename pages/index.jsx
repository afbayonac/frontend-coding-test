import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import { useState } from 'react'

// TODO: add message when profiles are empty
// TODO: catch server side errors

function Home ({ profiles = [] }) {
  const [sort, setSort] = useState('asc')

  function toggleSort () {
    setSort(sort === 'asc' ? 'desc' : 'asc')
  }

  return (
    <Layout>
      <div onClick={toggleSort}>
        Age {sort === 'asc' ? '↓' : '↑'}
      </div>
      <ol>
        {profiles
          .sort((a, b) => sort === 'asc'
            ? a.age - b.age
            : b.age - a.age
          )
          .map(profile => (
            <li key={profile.id}>
              <Link href={`profile/${profile.id}`}>
                <div>
                  {profile.fullName} - {profile.age}
                </div>
              </Link>
            </li>
          ))}
      </ol>
    </Layout>
  )
}

export async function getServerSideProps () {
  const response = await fetch('http://localhost:3001/people')
  const profiles = await response.json()

  return {
    props: {
      profiles
    }
  }
}

export default Home
