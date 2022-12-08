import Head from 'next/head'
import Input from '../../../components/Input/Input'
import Layout from '../../../components/Layout/Layout'

function Edit ({ profile }) {
  let count = 0
  count += 1
  console.log(count)
  const { id, age, fullName, occupation, nickname, gender } = profile
  return (
    <Layout>
      <Head>
        <title> Tanabata User edit</title>
      </Head>
      <main>
        <Input
          label='Full Name'
          initValue={fullName}
          type='text'
          entity='profile'
          name='fullName'
          id={id}
          isValid={v => !!String(v).match(/^.{3,}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Nickname'
          initValue={nickname}
          type='text'
          entity='profile'
          name='nickname'
          id={id}
          maxLength='15'
          isValid={v => !!String(v).match(/^[A-Za-z0-9 ]{4,15}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Occupation'
          initValue={occupation}
          type='text'
          entity='profile'
          name='occupation'
          id={id}
          maxLength='25'
          isValid={v => !!String(v).match(/^[A-Za-z0-9 ]{3,}/)}
          sanitizer={v => String(v).replace(/[^A-Za-z0-9 ]/mg, '').replace('  ', ' ')}
        />
        <Input
          label='Gender'
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
          label='Age'
          initValue={age}
          type='number'
          entity='profile'
          name='age'
          id={id}
          isValid={v => !isNaN(v) && Number(v) > 0 && Number(v) < 120}
          sanitizer={v => Number(v)}
        />
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
