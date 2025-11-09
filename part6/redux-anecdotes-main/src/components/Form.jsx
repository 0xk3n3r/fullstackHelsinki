import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { appendAnecdote } from '../reducers/anecdoteReducer'

const Form = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log('Form submitted')
    const content = event.target.anecdote.value
    dispatch(setNotification(`new anecdote '${content}'`, 3000))
    event.target.anecdote.value = ''
    dispatch(appendAnecdote(content))
  }

  

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default Form