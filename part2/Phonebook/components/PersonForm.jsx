import React from 'react';
import Person from './Person';

const PersonForm = ({ newName, newNumber, handleNumberChange, handleNoteChange, addName }) => {

  return (
    <div>
        <form onSubmit={addName}>
          <input value={newName} onChange={handleNoteChange} placeholder="Name"/>
          <input value={newNumber} onChange={handleNumberChange} placeholder="Number"/>
          <button type="submit">add</button>
        </form>
    </div>
  );
};

export default PersonForm;