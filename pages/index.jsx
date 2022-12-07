import Link from 'next/link'
import Layout from '../components/Layout/Layout'

function Home () {
  return (
    <Layout>
      <ol>
        <li>
          <Link href='profile/A'>A User</Link>
        </li>
      </ol>
    </Layout>
  )
}

export default Home
