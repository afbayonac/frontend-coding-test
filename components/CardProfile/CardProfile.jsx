import Image from 'next/image'
import styles from './CardProfile.module.css'

const CardProfile = ({ picture, fullName, nickname, age, gender, occupation }) => {
  return (
    <div className={styles.card_profile}>
      <div>
        <Image width={128} height={128} objectFit='cover' alt={`picture of ${fullName}`} src={picture} />
      </div>
      <div className={styles.card_profile__info}>
        <h2>{fullName}</h2>
        <sub>{occupation}</sub>
        <sub>{age} {gender}</sub>
      </div>
    </div>
  )
}

export default CardProfile
