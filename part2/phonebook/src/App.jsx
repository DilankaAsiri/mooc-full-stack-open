import { useState } from "react";

const Filter = ({ onNameFilterChange }) => {
  const handleNameFilter = (event) => {
    const searchText = event.target.value;
    onNameFilterChange(searchText);
  };

  return (
    <div>
      filter shown with: <input onChange={handleNameFilter} />
    </div>
  );
};

const PersonForm = ({ onNewPersonAdded }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const _newName = newName.trim();

    onNewPersonAdded({ name: _newName, number: newNumber });

    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addPerson}>
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

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [showPersons, setShowPersons] = useState(persons);

  const handleOnNewPersonAdded = (person) => {
    if (persons.map((p) => p.name).find((p) => p === person.name)) {
      alert(`${person.name} is already added to phonebook`);
      return;
    }
    setPersons([...persons, person]);
  };

  const handleNameFilter = (searchText) => {
    if (searchText && searchText != "") {
      setShowPersons([
        ...persons.filter(
          (p) => p.name.toLowerCase().search(searchText.toLowerCase()) >= 0
        ),
      ]);
    } else {
      setShowPersons([...persons]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onNameFilterChange={handleNameFilter} />
      <h3>add a new</h3>
      <PersonForm onNewPersonAdded={handleOnNewPersonAdded} />
      <h3>Numbers</h3>
      <Persons persons={showPersons} />
    </div>
  );
};

export default App;
