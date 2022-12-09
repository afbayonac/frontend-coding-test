import { useEffect, useState } from 'react'
import { putAtribute } from '../../utils/putAttribute'
import styles from './CardTask.module.css'

// TODO: endDate verification

const CardTask = ({ id, title, description, endDate, startDate, completed }) => {
  const [check, setCheck] = useState({
    base: completed,
    value: completed,
    state: 'idle'
  })
  const [timer, setTimer] = useState(null)

  const handleMark = (e) => {
    e.preventDefault()
    if (timer !== null) {
      clearTimeout(timer)
      setTimer(null)
    }

    setCheck({
      ...check,
      value: !check.value
    })
  }

  useEffect(() => {
    if (check.value === check.base) return
    setTimer(setTimeout(async () => {
      const saved = await putAtribute('tasks', id, check.value, 'completed')
      setCheck({
        ...check,
        value: saved ? check.value : check.base,
        base: saved ? check.value : check.base,
        state: saved ? 'idle' : 'server-error'
      })
    }), 1000)
  }, [check, setTimer, id])

  return (
    <div className={styles.card_task} data-completed={check.value}>
      <header>
        <span>{title}</span>
        <button onClick={handleMark}>{check.value ? 'Mark as completed' : 'Mark as not completed'}</button>
      </header>
      <span>{description}</span>
      <footer><span>{startDate}</span><span>{endDate}</span></footer>
    </div>
  )
}

export default CardTask
