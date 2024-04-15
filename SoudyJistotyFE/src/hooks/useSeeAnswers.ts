import { useEffect, useState } from 'react'

export const useSeeAnswers = () => {
  const [seeAnswers, setSeeAnswers] = useState(false)

  useEffect(() => {
    setSeeAnswers(localStorage.getItem('seeAnswers') == '1')
  }, [])

  return seeAnswers
}
