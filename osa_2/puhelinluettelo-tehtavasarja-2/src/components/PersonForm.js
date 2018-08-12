import React from 'react'

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return(
    <div>
      <h2>Lisää uusi</h2>
        <form onSubmit={addPerson}>
          <div>
            nimi: 
            <input
              value={newName}
              onChange={handleNameChange}
            />
            <br />
            numero: 
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
    </div>
  )
}

export default PersonForm