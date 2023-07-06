import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    const checkMatch = (anecdote) => {
      return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    }
    return state.anecdotes.filter(checkMatch)
  })

  const likeAnecdote = (id) => {
    dispatch(addLike(id))
  }
  return (
    <div>
      {anecdotes
        .sort((firstItem, secondItem) =>  secondItem.votes - firstItem.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => likeAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteList