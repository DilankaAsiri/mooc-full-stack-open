import { useState, useEffect } from "react";

import personService from "./services/persons";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Notification from "./components/notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showPersons, setShowPersons] = useState(persons);
  const [resetFilters, setResetFilters] = useState();
  const [notification, setNotification] = useState(null);

  const setPersonsData = (persons) => {
    setResetFilters(!resetFilters);
    setPersons([...persons]);
    setShowPersons([...persons]);
  };

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersonsData(persons);
    });
  }, []);

  const showNotification = (message, error = false) => {
    setNotification({ message, error });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleOnPersonPatch = (person) => {
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === person.name.toLowerCase()
    );

    if (!existingPerson) {
      personService.create(person).then((personRes) => {
        setPersonsData([...persons, personRes]);
        showNotification(`Added ${personRes.name}`);
      });
      return;
    }

    if (existingPerson.number == person.number) {
      alert(`${person.name} is already added to phonebook`);
      return;
    }

    if (
      window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const { id, ...rest } = existingPerson;
      personService
        .update(id, { ...rest, number: person.number })
        .then((personRes) => {
          setPersonsData(
            persons.map((p) => (p.id !== personRes.id ? p : personRes))
          );
          showNotification(`Updated ${personRes.name}`);
        });
      return;
    }
  };

  const handleOnPersonDelete = (person) => {
    const removeFromLocalState = () => {
      const newArr = [...persons];
      newArr.splice(persons.map((p) => p.id).indexOf(person.id), 1);
      setPersonsData([...newArr]);
    };
    personService
      .remove(person.id)
      .then(() => removeFromLocalState())
      .catch((err) => {
        if (err.response.status == 404) {
          removeFromLocalState();
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            true
          );
        }
      });
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
      <Notification notification={notification} />
      <Filter
        onNameFilterChange={handleNameFilter}
        resetFilters={resetFilters}
      />
      <h3>add a new</h3>
      <PersonForm onPersonPatch={handleOnPersonPatch} />
      <h3>Numbers</h3>
      <Persons persons={showPersons} onDelete={handleOnPersonDelete} />
    </div>
  );
};

export default App;
