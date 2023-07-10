import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '' ,
    reducers: {
      addNewNotification(state, action) {
        return action.payload
      },
      removeNotification(state, action) {
        return ''
      }
    },
})

export const { newLikeNotification, addNewNotification, removeNotification } = notificationSlice.actions

export const addNotification = (content, time) => {
  return dispatch => {
    dispatch(addNewNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer