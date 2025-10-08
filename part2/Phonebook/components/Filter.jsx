
import React from 'react';
import Person from './Person';

const Filter = ({ persons, searchTerm, handleSearchChange }) => {
  const filterPersons = persons.filter(person =>
    person.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
  );
};

export default Filter;