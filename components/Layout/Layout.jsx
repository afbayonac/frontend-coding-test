import Head from 'next/head'
import Link from 'next/link'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title> Tanabata </title>
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>
      <header>
        <nav>
          <Link href='/'>Home</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        make by afbayonac
      </footer>
    </>
  )
}

export default Layout
