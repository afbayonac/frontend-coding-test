import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../../components/Layout/Layout'

function Profile () {
  return (
    <Layout>
      <Head>
        <title> Tanabata User edit</title>
      </Head>
      <div>
        A user <Link href='/profile/A/edit'>Edit</Link>
      </div>
      <ol>
        <li>
          <Link href='/tasks/1/edit'>A Task</Link>
        </li>
      </ol>
    </Layout>
  )
}

export default Profile
