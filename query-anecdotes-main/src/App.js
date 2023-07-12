import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query' 
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests/requests'
import { errorNotification, likeNotification, newNotification, removeNotification, useNotificationDispatch } from './context/notificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const result = useQuery('anecdotes', getAnecdotes)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data, content) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch(newNotification(content))
      setTimeout(() =>{
        dispatch(removeNotification())
      }, 5000)
    },
    onError: (error) => {
      dispatch(errorNotification())
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  
  const addAnecdote = async (content) => {
    newAnecdoteMutation.mutate(content)
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch(likeNotification(anecdote.content))
    setTimeout(() =>{
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm handleSubmit={addAnecdote}/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
