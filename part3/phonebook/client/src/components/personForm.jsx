import { useState } from "react";

const PersonForm = ({ onPersonPatch }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const personPatch = (event) => {
    event.preventDefault();
    const _newName = newName.trim();
    Promise.resolve().then(() => {
      onPersonPatch({ name: _newName, number: newNumber });
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <form onSubmit={personPatch}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
