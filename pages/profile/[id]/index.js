import Link from 'next/link'

function Profile () {
  return (
    <main>
      <div>
        A user <Link href='/profile/A/edit'>Edit</Link>
      </div>
      <ol>
        <li>
          <Link href='/tasks/1/edit'>A Task</Link>
        </li>
      </ol>
    </main>
  )
}

export default Profile
