const baseUrl = 'http://172.26.91.253:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  const data = await response.json()
  return data
}

const createNew = async (content) => {
  const newAnecdote = {
    content,
    id: getId(),
    votes: 0,
  }
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  }
  
  const response = await fetch(baseUrl, options)
  
  if (!response.ok) {
    throw new Error('Failed to create note')
  }
  
  return await response.json()
}

export default { getAll, createNew }