import { useState, useEffect } from 'react'

const putAtribute = async (entity, id, value, name) => {
  try {
    const response = await fetch(`/api/${entity}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        [name]: value
      })
    })

    if (response.status !== 200) throw new Error()
    return true
  } catch (e) {
    return false
  }
}

const Input = ({ id, entity, name, initValue, label, isValid, sanitizer, as = 'input', type, children, ...props }) => {
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
      setState({
        ...state,
        'data-state': (await putAtribute(entity, id, state.value, name)) ? 'idle' : 'server-error'
      })
    }, 1000))
  }, [state, setState, entity, id, name])

  return (
    <div>
      <label>{label} {state['data-state']}</label>
      <CustomTag
        {...state} onChange={(e) => changeState(type === 'checkbox' ? e.target.checked : e.target.value)}
      >
        {children}
      </CustomTag>
    </div>
  )
}

export default Input
