import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

/*
const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)
*/

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(n => n.id === id)
      if (anecdote) {
        anecdote.votes += 1
        console.log(current(state))
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
const { createAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { vote } = anecdotesSlice.actions
export default anecdotesSlice.reducer