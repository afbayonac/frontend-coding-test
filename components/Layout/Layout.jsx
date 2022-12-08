import Head from 'next/head'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Tanabata</title>
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
