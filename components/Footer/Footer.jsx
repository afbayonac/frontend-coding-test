import styles from './Footer.module.css'

const Footer = ({ children }) => {
  return (
    <>
      <div className={styles.space}> </div>
      <footer className={styles.footer}>
        Make by <a target='_blank' rel='noreferrer' href='https://afbayonac.github.io/cv/'>afbayonac</a>
      </footer>
    </>
  )
}

export default Footer
