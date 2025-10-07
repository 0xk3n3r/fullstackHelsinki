import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', id: 1, number: '040-123456' },
    { content: 'Ada Lovelace', id: 2, number: '39-44-5323523' },
    { content: 'Dan Abramov', id: 3, number: '12-43-234345' },
    { content: 'Mary Poppendieck', id: 4, number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('') 

  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.content.toLowerCase() === newName.toLowerCase())

    if (nameExists) {
      alert(`${newName} is already in the phonebook.`)
      return
    }
    const personObject = {
      content: newName,
      number: newNumber,
      important: Math.random() > 0.5,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const filterPersons = persons.filter(person =>
    person.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <input
          placeholder="filter shown with"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
        {filterPersons.map(person => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
      </div>
      <h3>Add a new</h3>
        <div>
          <form onSubmit={addName}>
            <input value={newName} onChange={handleNoteChange} placeholder="Name"/>
            <input value={newNumber} onChange={handleNumberChange} placeholder="Number"/>
            <button type="submit">add</button>
          </form>
        </div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  )
}

export default App