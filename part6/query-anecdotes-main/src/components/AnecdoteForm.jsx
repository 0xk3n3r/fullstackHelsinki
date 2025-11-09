import React, { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import { NotificationContext } from '../NotificationContext'

const AnecdoteForm = () => {
  const { showNotification } = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const notes = useQueryClient.getQueryData(['anecdotes'])
      useQueryClient.setQueryData(['anecdotes'], notes.concat(newAnecdote))
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    showNotification(`A new note "${content}"!`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
