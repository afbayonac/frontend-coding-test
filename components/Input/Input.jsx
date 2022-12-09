import { useState, useEffect } from 'react'
import { putAtribute } from '../../utils/putAttribute'
import styles from './Input.module.css'

// TODO arrow select

const Input = ({ id, entity, name, initValue, label, isValid, sanitizer, as = 'input', type, children, error, ...props }) => {
  const [timer, setTimer] = useState(null)
  const CustomTag = as
  const [state, setState] = useState({
    ...props,
    type,
    value: initValue,
    'data-state': 'idle',
    'data-base': initValue
  })

  const changeState = (value) => {
    console.log(value)
    if (timer !== null) {
      clearTimeout(timer)
      setTimer(null)
    }

    const v = sanitizer(value)

    setState({
      ...state,
      'data-state': v === state.value
        ? 'idle'
        : isValid(v)
          ? 'valid'
          : 'error',
      value: v
    })
  }

  useEffect(() => {
    if (state['data-state'] !== 'valid') return

    setTimer(setTimeout(async () => {
      const saved = await putAtribute(entity, id, state.value, name)
      setState({
        ...state,
        'data-base': saved ? state.value : state['data-base'],
        'data-state': saved ? 'idle' : 'server-error'
      })
    }, 1000))
  }, [state, setState, entity, id, name])

  return (
    <div className={styles.input}>
      <label>{label} <span className={state['data-state'] === 'valid' ? styles.active : ''}>...saving</span></label>
      <CustomTag
        {...state} onChange={(e) => changeState(type === 'checkbox' ? e.target.checked : e.target.value)}
      >
        {children}
      </CustomTag>
      <sub>
        {state['data-state'] === 'error' && error}
        {state['data-state'] === 'server-error' && 'server-error'}
      </sub>
    </div>
  )
}

export default Input
