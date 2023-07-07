import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import { likeNotification, removeNotification } from '../reducers/notifictionReducer'

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

  const likeAnecdote = (id, content) => {
    dispatch(addLike(id))
    dispatch(likeNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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
            <button onClick={() => likeAnecdote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteList