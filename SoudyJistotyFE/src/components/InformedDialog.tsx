import { useState } from 'react'

export const InformedDialog = () => {
  const [isActive, setIsActive] = useState(false)

  const toggleModal = () => {
    setIsActive(!isActive)
  }

  return (
    <div>
      <button className="button is-primary" onClick={toggleModal}>
        {isActive ? 'Close' : 'Open'} Modal
      </button>
    </div>
  )
}
