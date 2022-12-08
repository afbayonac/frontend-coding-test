import Head from 'next/head'
import Header from '../Header/Header'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Tanabata</title>
      </Head>
      <Header />
      <main>{children}</main>
      <footer>
        make by <a target='_blank' rel='noreferrer' href='https://afbayonac.github.io/cv/'>afbayonac</a>
      </footer>
    </>
  )
}

export default Layout
