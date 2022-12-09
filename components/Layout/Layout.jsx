import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Tanabata</title>
      </Head>
      <Header />
      <nav className={styles.nav}>
        <ul>
          <li>
            <button onClick={() => router.back()}>⟵</button>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
