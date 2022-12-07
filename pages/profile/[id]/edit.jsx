import Head from 'next/head'
import Layout from '../../../components/Layout/Layout'

function Edit ({ profile }) {
  return (
    <Layout>
      <Head>
        <title> Tanabata User edit</title>
      </Head>
      <main>
        <div>{profile.fullName}</div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const { id } = params

  const response = await fetch(`http://localhost:3001/people/${id}`)
  const profile = await response.json()

  console.log(profile)

  return {
    props: {
      profile
    }
  }
}

export default Edit
