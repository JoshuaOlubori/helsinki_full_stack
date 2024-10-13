import { useState } from "react";
import { isEqual } from "lodash";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  // const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInputChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setNewSearch(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  console.log(filteredPersons, newSearch);

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
      <p>
        filter shown with a{" "}
        <input
          type="text"
          value={newSearch}
          onChange={handleSearchInputChange}
        />
      </p>
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
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <span>{person.name}</span>:<span>{person.number}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
