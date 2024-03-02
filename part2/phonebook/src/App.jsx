import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ onNameFilterChange, resetFilters }) => {
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    setNameFilter("");
  }, [resetFilters]);

  const handleNameFilter = (event) => {
    const searchText = event.target.value;
    setNameFilter(searchText);
    onNameFilterChange(searchText);
  };

  return (
    <div>
      filter shown with:{" "}
      <input value={nameFilter} onChange={handleNameFilter} />
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
  const [persons, setPersons] = useState([]);
  const [showPersons, setShowPersons] = useState(persons);
  const [resetFilters, setResetFilters] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setShowPersons(response.data);
    });
  }, []);

  const handleOnNewPersonAdded = (person) => {
    if (persons.map((p) => p.name).find((p) => p === person.name)) {
      alert(`${person.name} is already added to phonebook`);
      return;
    }
    setPersons([...persons, person]);
    setShowPersons([...persons, person]);
    setResetFilters(true);
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
      <Filter
        onNameFilterChange={handleNameFilter}
        resetFilters={resetFilters}
      />
      <h3>add a new</h3>
      <PersonForm onNewPersonAdded={handleOnNewPersonAdded} />
      <h3>Numbers</h3>
      <Persons persons={showPersons} />
    </div>
  );
};

export default App;
