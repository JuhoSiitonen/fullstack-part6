import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
        return `Created new anecdote '${action.payload}'`
    case "LIKE":
        return `You voted '${action.payload}'`
    case "REMOVE":
        return ""
    case "LESS":
        return "Anecdote should be more than 4 characters long"
    default:
        return state
  }
}

export const newNotification = content => {
    return {
      type: 'NEW',
      payload: content,
    }
  }

export const likeNotification = content => {
    return {
      type: 'LIKE',
      payload: content,
    }
  }

export const removeNotification = () => {
    return {
      type: 'REMOVE'
    }
  }

export const errorNotification = () => {
    return {
      type: 'LESS',
    }
  }

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
  }
  
  export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
  }

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext