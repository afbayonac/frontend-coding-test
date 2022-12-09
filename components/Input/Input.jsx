import { useState, useEffect } from 'react'
import { putAtribute } from '../../utils/putAttribute'
import { isFunction } from '../../utils/utils'
import styles from './Input.module.css'

// TODO arrow select

const Input = ({ id, entity, name, initValue, label, isValid, sanitizer, as = 'input', type, children, error, callback, min, max, minLength, maxLength, rows }) => {
  const [timer, setTimer] = useState(null)
  const CustomTag = as

  const [state, setState] = useState({
    type,
    min,
    max,
    minLength,
    maxLength,
    rows,
    value: initValue,
    ...(type === 'checkbox'
      ? { checked: initValue }
      : {}
    ),
    'data-state': 'idle',
    'data-base': initValue
  })

  const changeState = (value) => {
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
      value: v,
      ...(type === 'checkbox'
        ? { checked: v }
        : {}
      )
    })

    isFunction(callback) && callback(v, v === state.value
      ? 'idle'
      : isValid(v)
        ? 'valid'
        : 'error')
  }

  useEffect(() => {
    const setInitValue = async () => {
      setState({
        type,
        min,
        max,
        minLength,
        rows,
        value: initValue,
        ...(type === 'checkbox'
          ? { checked: initValue }
          : {}
        ),
        'data-state': 'idle',
        'data-base': initValue
      })
    }

    setInitValue()
  }, [initValue, type, min, max, minLength, maxLength, rows])

  useEffect(() => {
    if (state['data-state'] !== 'valid') return
    if (!id) return

    setTimer(setTimeout(async () => {
      const saved = await putAtribute(entity, id, state.value, name)

      setState({
        ...state,
        value: saved ? state.value : state['data-base'],
        ...(type === 'checkbox'
          ? { checked: saved ? state.value : state['data-base'] }
          : {}
        ),
        'data-base': saved ? state.value : state['data-base'],
        'data-state': saved ? 'idle' : 'server-error'
      })

      if (saved && isFunction(callback)) {
        callback(state.value, saved ? 'idle' : 'server-error')
      }
    }, 1000))

    setState({
      ...state,
      'data-state': 'loading'
    })
  }, [state, entity, id, name, callback, type])

  return (
    <div className={styles.input}>
      <label>{label} <span className={state['data-state'] === 'loading' ? styles.active : ''}>...saving</span></label>
      <CustomTag
        {...state}
        onChange={(e) => changeState(type === 'checkbox' ? e.target.checked : e.target.value)}
      >
        {children}
      </CustomTag>
      <sub>
        {state['data-state'] === 'error' && error}
        {state['data-state'] === 'server-error' && 'Server Error'}
      </sub>
    </div>
  )
}

export default Input
