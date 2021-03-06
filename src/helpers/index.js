const countObjectLength = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  }
  return 0
}
const removeEmptyProps = obj => {
  const objCopy = {...obj}
  Object.keys(objCopy).forEach(key => {
    if (!objCopy[key]) {
      delete objCopy[key]
    }
  })
  return objCopy
}

export { countObjectLength, removeEmptyProps }
