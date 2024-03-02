const Persons = ({ persons, onDelete }) => {
  const handleOnDelete = (person) => {
    // to eliminate violation warning
    Promise.resolve().then(() => {
      if (window.confirm(`Delete ${person.name} ?`)) {
        onDelete(person);
      }
    });
  };

  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <div style={{ display: "inline-block" }}>{person.name}</div>
          <div style={{ display: "inline-block", marginLeft: "1em" }}>
            {person.number}
          </div>
          <button
            style={{
              display: "inline-block",
              backgroundColor: "lightblue",
              marginLeft: "1em",
            }}
            onClick={() => handleOnDelete(person)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
