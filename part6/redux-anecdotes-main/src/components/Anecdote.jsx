import { useSelector, useDispatch } from 'react-redux'
import { searchFilter } from '../reducers/filterReducer'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(searchFilter(event.target.value))
  }

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 3000))
  }

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content?.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        filter <input value={filter} onChange={handleFilterChange} />
      </div>

      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>Votes: {anecdote.votes}</p>
          <button onClick={() => handleVote(anecdote)}>Vote</button>
        </div>
      ))}
    </div>
  )
}

export default Anecdotes
