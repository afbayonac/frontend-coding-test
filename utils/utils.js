export const isBeforeToday = (date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(date) < today
}

export const isEndDate = (endDate) => endDate !== null &&
  endDate !== undefined &&
  endDate !== '' &&
  !!endDate.match(/^\d{4}-\d{2}-\d{2}$/)

export const isFunction = f => !!f && f instanceof Function
