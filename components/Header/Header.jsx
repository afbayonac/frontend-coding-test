import Link from 'next/link'
import styles from './Header.module.css'

const Header = ({ children }) => {
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <div>
          <Link href='/'>
            <a>
              <span>🎋</span>
              Tanabata
            </a>
          </Link>
        </div>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
