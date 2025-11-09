import React, { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { NotificationContext } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdote'] });
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(updatedAnecdote)
    showNotification(`A new vote "${anecdote.content}"!`)
  }

  const result = useQuery({
    queryKey: ['anecdote'],
    queryFn: getAnecdotes
    })
 
  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }
 
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
