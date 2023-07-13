import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (content) => {
  const object = { content, votes: 0 }
  axios.post(baseUrl, object)
    .then(res => res.data)
}

export const updateAnecdote = (object) => {
  axios.put(`${baseUrl}/${object.id}`, object).then(res => res.data)
}