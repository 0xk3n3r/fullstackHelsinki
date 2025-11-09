import React, { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const { state } = useContext(NotificationContext)
  return (
    <div style={style}>
      {state.message}
    </div>
  )
}

export default Notification
