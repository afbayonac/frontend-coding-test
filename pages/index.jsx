import Link from 'next/link'
import Layout from '../components/Layout/Layout'

// TODO: add message when profiles are empty
// TODO: catch server side errors

function Home ({ profiles = [] }) {
  return (
    <Layout>
      <ol>
        {profiles.map(profile => (
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
