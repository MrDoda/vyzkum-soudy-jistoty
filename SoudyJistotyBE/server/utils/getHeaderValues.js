const customHeaderName = 'x-custom-header'
export const getIsAdmin = (req) => {
  let possibleHeaders = req.headers[customHeaderName]
  try {
    possibleHeaders = JSON.parse(possibleHeaders)
  } catch {
    return false
  }

  if (possibleHeaders.isAdmin !== '1234') {
    return false
  }

  return true
}

export const getUserKey = (req) => {
  let possibleHeaders = req.headers[customHeaderName]
  try {
    possibleHeaders = JSON.parse(possibleHeaders)
  } catch {
    return undefined
  }

  return possibleHeaders.userKey
}

export const getSoloTest = (req) => {
  let possibleHeaders = req.headers[customHeaderName]
  try {
    possibleHeaders = JSON.parse(possibleHeaders)
  } catch {
    return undefined
  }

  return possibleHeaders.soloTest
}

export const getDuoTest = (req) => {
  let possibleHeaders = req.headers[customHeaderName]
  try {
    possibleHeaders = JSON.parse(possibleHeaders)
  } catch {
    return undefined
  }

  return possibleHeaders.duoTest
}
