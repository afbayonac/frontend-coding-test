import Head from 'next/head'
import Input from '../../../components/Input/Input'
import Layout from '../../../components/Layout/Layout'
import style from './edit.module.css'

function Edit ({ profile }) {
  let count = 0
  count += 1
  console.log(count)
  const { id, age, fullName, occupation, nickname, gender, picture } = profile
  return (
    <Layout>
      <Head>
        <title> Tanabata User edit</title>
      </Head>
      <h1 className={style.title}> Edit profile: <span>{profile.id}</span></h1>
      <div className={style.edit}>
        <Input
          label='Full Name *'
          initValue={fullName}
          type='text'
          entity='profile'
          name='fullName'
          id={id}
          error='min 3 characters required'
          isValid={v => !!String(v).match(/^.{3,}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Nickname *'
          initValue={nickname}
          type='text'
          entity='profile'
          name='nickname'
          id={id}
          maxLength='15'
          error='min 4 characters required '
          isValid={v => !!String(v).match(/^[A-Za-z0-9 ]{4,15}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Occupation *'
          initValue={occupation}
          type='text'
          entity='profile'
          name='occupation'
          id={id}
          maxLength='25'
          error='min 3 characters required'
          isValid={v => !!String(v).match(/^[A-Za-z0-9 ]{3,25}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Gender *'
          initValue={gender}
          type='text'
          entity='profile'
          name='gender'
          id={id}
          as='select'
          isValid={v => ['Male', 'Female'].includes(v)}
          sanitizer={v => String(v)}
        >
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </Input>
        <Input
          label='Age *'
          initValue={age}
          type='number'
          entity='profile'
          name='age'
          id={id}
          isValid={v => !isNaN(v) && Number(v) > 18 && Number(v) < 120}
          sanitizer={v => v === '' ? v : Number(v)}
          min='18'
          max='120'
        />
        <Input
          label='Picture *'
          initValue={picture}
          type='text'
          entity='profile'
          name='picture'
          id={id}
          error='shuld be like: https://domain.co/img.png'
          isValid={v => !!String(v).match(/^(https:)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/)}
          sanitizer={v => String(v).replace(/[^\w/:-_.]/mg, '')}
        />
      </div>
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
