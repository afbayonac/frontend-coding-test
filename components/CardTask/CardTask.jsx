import { useEffect, useState } from 'react'
import { putAtribute } from '../../utils/putAttribute'
import { isBeforeToday, isEndDate } from '../../utils/utils'
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

  const dateComplete = () => check.value || isForceCompleted()

  const isForceCompleted = () => isEndDate(endDate) && isBeforeToday(endDate)

  return (
    <div className={styles.card_task} data-completed={dateComplete()}>
      <header>
        <span>{title}</span>
        <button onClick={handleMark} disabled={isForceCompleted()}>
          {check.value ? 'Mark as not completed' : 'Mark as completed'}
        </button>
      </header>
      <span>{description}</span>
      <footer>
        <span>{startDate}</span>
        <span data-end={isForceCompleted()}>{endDate}</span>
      </footer>
    </div>
  )
}

export default CardTask
