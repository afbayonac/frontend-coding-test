import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '../../components/Input/Input'
import Layout from '../../components/Layout/Layout'
import { postEntiy } from '../../utils/postEntity'
import styles from './new.module.css'

function New () {
  const router = useRouter()
  const [fullName, setFullName] = useState({
    value: '',
    state: 'idle'
  })
  const [occupation, setOccupation] = useState({
    value: '',
    state: 'idle'
  })
  const [gender, setGender] = useState({
    value: '',
    state: 'idle'
  })
  const [age, setAge] = useState({
    value: '',
    state: 'idle'
  })
  const [nickname, setNickname] = useState({
    value: false,
    state: 'idle'
  })
  const [picture, setPicture] = useState({
    value: false,
    state: 'idle'
  })

  const handlerFullName = (value, state) => setFullName({
    value,
    state
  })

  const handlerNickname = (value, state) => setNickname({
    value,
    state
  })

  const handlerOccupation = (value, state) => setOccupation({
    value,
    state
  })

  const handlerGender = (value, state) => setGender({
    value,
    state
  })

  const handlerAge = (value, state) => setAge({
    value,
    state
  })

  const handlerPicture = (value, state) => setPicture({
    value,
    state
  })

  const readyToSend = () => {
    return [fullName, nickname, occupation, age, gender, picture].every(e => e.state === 'valid')
  }

  const save = async () => {
    const body = {
      fullName: fullName.value,
      nickname: nickname.value,
      occupation: occupation.value,
      age: age.value,
      gender: gender.value,
      picture: picture.value
    }

    const saved = await postEntiy('profile', body)

    if (saved) {
      router.push('/')
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
          label='Full Name *'
          initValue=''
          type='text'
          entity='profile'
          name='fullName'
          callback={handlerFullName}
          error='min 3 characters required'
          isValid={v => !!String(v).match(/^.{3,}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Nickname *'
          initValue=''
          type='text'
          entity='profile'
          name='nickname'
          maxLength='15'
          callback={handlerNickname}
          error='min 4 characters required '
          isValid={v => !!String(v).match(/^[A-Za-z0-9 ]{4,15}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Occupation *'
          initValue=''
          type='text'
          entity='profile'
          name='occupation'
          maxLength='25'
          callback={handlerOccupation}
          error='min 3 characters required'
          isValid={v => !!String(v).match(/^[A-Za-z0-9 ]{3,25}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Gender *'
          initValue=''
          type='text'
          entity='profile'
          name='gender'
          as='select'
          callback={handlerGender}
          isValid={v => ['Male', 'Female'].includes(v)}
          sanitizer={v => String(v)}
        >
          <option value=''> </option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </Input>
        <Input
          label='Age *'
          initValue=''
          type='number'
          entity='profile'
          name='age'
          callback={handlerAge}
          isValid={v => !isNaN(v) && Number(v) > 18 && Number(v) < 120}
          sanitizer={v => v === '' ? v : Number(v)}
          min='18'
          max='120'
        />
        <Input
          label='Picture *'
          initValue=''
          type='text'
          entity='profile'
          name='picture'
          callback={handlerPicture}
          error='shuld be like: https://randomuser.me/img.png'
          isValid={v => !!String(v).match(/^(https:\/\/randomuser\.me)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/)}
          sanitizer={v => String(v).replace(/[^\w/:-_.]/mg, '')}
        />
        <button disabled={!readyToSend()} onClick={save}>save</button>
      </div>
    </Layout>
  )
}

export default New
