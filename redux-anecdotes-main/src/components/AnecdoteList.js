import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notifictionReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes}) => {
    if (filter === '') {
      return anecdotes
    }
    const checkMatch = (anecdote) => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    }
    return anecdotes.filter(checkMatch)
  })

  const copyAnecdotes = [...anecdotes]

  const likeAnecdote = (id, anecdote) => {
    dispatch(addLike(id, anecdote))
    dispatch(addNotification(`you voted '${anecdote.content}'`, 5))
  }
  return (
    <div>
      {copyAnecdotes
        .sort((firstItem, secondItem) => secondItem.votes - firstItem.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => likeAnecdote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteList