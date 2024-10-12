import { useState } from "react";
import { isEqual } from "lodash";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 9999999 },
  ]);
  const [newName, setNewName] = useState(" ");
  const [newNumber, setNewNumber] = useState(" ");

  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInputChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = { name: newName, number: newNumber };
    const matchingObjs = persons.filter((person) => isEqual(newObj, person));
    console.log(matchingObjs);

    if (matchingObjs.length != 0) {
      alert(`${newObj.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newObj));
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            name: <input value={newName} onChange={handleNameInputChange} />
          </p>
          <p>
            {" "}
            number:{" "}
            <input value={newNumber} onChange={handleNumberInputChange} />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          <span>{person.name}</span>:<span>{person.number}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
