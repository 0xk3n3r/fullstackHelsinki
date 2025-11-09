    
import React from 'react'
import Person from './Person'
import Filter from './Filter';

const Persons = ({persons, handleDelete}) => {
    return (
        <ul>
          {persons.map(person => (
            <li key={person.id}>
              {person.content} {person.number}
              <button onClick={() => handleDelete(person.id, person.content)}>delete</button>
            </li>
        ))}
      </ul>
    );
}

export default Persons