import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '../../components/Input/Input'
import Layout from '../../components/Layout/Layout'
import { getAllPeople } from '../../services/people'
import { postEntiy } from '../../utils/postEntity'
import styles from './new.module.css'

function New ({ profiles }) {
  const router = useRouter()
  const [title, setTitle] = useState({
    value: '',
    state: 'idle'
  })
  const [description, setDesciption] = useState({
    value: '',
    state: 'idle'
  })
  const [startDate, setStartDate] = useState({
    value: '',
    state: 'idle'
  })
  const [endDate, setEndDate] = useState({
    value: '',
    state: 'valid'
  })
  const [completed, setCompleted] = useState({
    value: false,
    state: 'valid'
  })
  const [profile, setProfile] = useState({
    value: '',
    state: 'idle'
  })

  const handlerEndDate = (value, state) => setEndDate({
    value,
    state
  })

  const handlerCompleted = (value, state) => setCompleted({
    value,
    state
  })

  const handlerTitle = (value, state) => setTitle({
    value,
    state
  })

  const handlerStartDate = (value, state) => setStartDate({
    value,
    state
  })

  const handlerDescription = (value, state) => setDesciption({
    value,
    state
  })

  const handlerProfile = (value, state) => {
    setProfile({
      value,
      state
    })
  }

  const readyToSend = () => {
    return [completed, startDate, endDate, description, title, profile].every(e => e.state === 'valid')
  }

  const save = async () => {
    const body = {
      title: title.value,
      completed: completed.value,
      startDate: startDate.value,
      endDate: endDate.value,
      description: description.value,
      personId: Number(profile.value)
    }

    const saved = await postEntiy('tasks', body)

    if (saved) {
      router.push(`/profile/${profile.value}`)
    }
  }

  return (
    <Layout>
      <Head>
        <title> Tanabata Task Edit </title>
      </Head>
      <h1 className={styles.title}> Create New Task </h1>
      <div className={styles.new}>
        <Input
          label='Title'
          initValue=''
          type='text'
          entity='tasks'
          name='title'
          maxLength='25'
          callback={handlerTitle}
          id={null}
          isValid={v => !!String(v).match(/^.{3,25}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Description'
          initValue=''
          as='textarea'
          entity='tasks'
          name='description'
          rows='8'
          callback={handlerDescription}
          id={null}
          isValid={v => !!String(v).match(/^.{4,500}/)}
          sanitizer={v => String(v).replace('  ', ' ')}
        />
        <Input
          label='Completed'
          initValue={false}
          type='checkbox'
          entity='tasks'
          name='completed'
          callback={handlerCompleted}
          id={null}
          isValid={v => true}
          sanitizer={v => Boolean(v)}
        />
        <Input
          label='Start Date *'
          initValue=''
          type='date'
          entity='tasks'
          name='startDate'
          callback={handlerStartDate}
          id={null}
          isValid={v => !!String(v).match(/^\d{4}-\d{2}-\d{2}$/)}
          sanitizer={v => String(v).replace(/[^0-9-]/mg, '')}
        />
        <Input
          label='End Date'
          initValue=''
          type='date'
          entity='tasks'
          name='endDate'
          callback={handlerEndDate}
          id={null}
          isValid={v => !!String(v).match(/^\d{4}-\d{2}-\d{2}$|^$/)}
          sanitizer={v => String(v).replace(/[^0-9-]/mg, '')}
        />
        <Input
          label='Profile *'
          initValue=''
          type='text'
          entity='profile'
          name='gender'
          id=''
          as='select'
          callback={handlerProfile}
          isValid={v => profiles.map(p => String(p.id)).includes(v)}
          sanitizer={v => v}
        >
          <option value=''> </option>
          {profiles.map(profile => <option key={profile.id} value={profile.id}>{profile.fullName}</option>)}
        </Input>
        <button disabled={!readyToSend()} onClick={save}>save</button>
      </div>
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

export default New
