import Head from 'next/head'
import { useState } from 'react'
import Input from '../../../components/Input/Input'
import Layout from '../../../components/Layout/Layout'
import { isBeforeToday, isEndDate } from '../../../utils/utils'
import styles from './edit.module.css'

function Edit ({ task }) {
  const { id, title, description, startDate, endDate, completed } = task
  const [_completed, setCompleted] = useState(completed)

  const handlerEndDate = (value) => {
    console.log(_completed, value)
    if (
      _completed === false &&
      isEndDate(value) &&
      isBeforeToday(value)
    ) {
      console.log('ok')
      setCompleted(true)
    }
  }

  const handlerCompleted = (value) => {
    setCompleted(value)
  }

  console.log(_completed)
  return (
    <Layout>
      <Head>
        <title> Tanabata Task Edit </title>
      </Head>
      <h1 className={styles.title}> Edit task <span>{task.id}</span></h1>
      <div className={styles.edit}>
        <Input
          label='Title *'
          initValue={title}
          type='text'
          entity='tasks'
          name='title'
          maxLength='25'
          id={id}
          isValid={v => !!String(v).match(/^.{3,25}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Description *'
          initValue={description}
          as='textarea'
          entity='tasks'
          name='description'
          rows='8'
          id={id}
          isValid={v => !!String(v).match(/^.{4,500}/)}
          sanitizer={v => String(v).replace('  ', ' ')}
        />
        <Input
          label='Completed'
          initValue={_completed}
          type='checkbox'
          entity='tasks'
          name='completed'
          callback={handlerCompleted}
          id={id}
          isValid={v => true}
          sanitizer={v => Boolean(v)}
        />
        <Input
          label='Start Date *'
          initValue={startDate}
          type='date'
          entity='tasks'
          name='startDate'
          id={id}
          isValid={v => !!String(v).match(/^\d{4}-\d{2}-\d{2}$/)}
          sanitizer={v => String(v).replace(/[^0-9-]/mg, '')}
        />
        <Input
          label='End Date'
          initValue={endDate || ''}
          type='date'
          entity='tasks'
          name='endDate'
          callback={handlerEndDate}
          id={id}
          isValid={v => !!String(v).match(/^\d{4}-\d{2}-\d{2}$|^$/)}
          sanitizer={v => String(v).replace(/[^0-9-]/mg, '')}
        />
      </div>

    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const { id } = params

  const responseTasks = await fetch(`http://localhost:3001/tasks/${id}`)
  const task = await responseTasks.json()

  if (
    isEndDate() &&
    isBeforeToday(task.endDate)
  ) {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...task, completed: true })
    })

    task.completed = true
  }

  return {
    props: {
      task
    }
  }
}

export default Edit
