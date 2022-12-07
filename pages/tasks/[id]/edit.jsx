import Head from 'next/head'
import Layout from '../../../components/Layout/Layout'

function Edit ({ task }) {
  return (
    <Layout>
      <Head>
        <title> Tanabata Task Edit </title>
      </Head>
      <h1>{task.title}</h1>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const { id } = params

  const responseTasks = await fetch(`http://localhost:3001/tasks/${id}`)
  const task = await responseTasks.json()

  console.log(task)

  return {
    props: {
      task
    }
  }
}

export default Edit
