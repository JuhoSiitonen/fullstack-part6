import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '' ,
    reducers: {
      likeNotification(state, action) {
        return `You voted '${action.payload}'`
      },
      addNotification(state, action) {
        return `You added anecdote '${action.payload}'`
      },
      removeNotification(state, action) {
        return ''
      }
    },
})

export const { likeNotification, addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer