// NotificationContext.js
import React, { createContext, useReducer } from 'react'

export const NotificationContext = createContext()

const initialState = {
  message: null,
  visible: false,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.payload, visible: true }
    case 'HIDE':
      return { message: null, visible: false }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const showNotification = (message) => {
    dispatch({ type: 'SHOW', payload: message })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ state, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
