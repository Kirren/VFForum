const countObjectLength = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  }
  return 0
}

export { countObjectLength }
