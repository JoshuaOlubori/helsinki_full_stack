import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState(" ");

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  function areTheseObjectsEqual(first, second) {
    "use strict";
    // from https://www.joshbritz.co/blog/why-its-so-hard-to-check-object-equality

    if (
      first === null ||
      first === undefined ||
      second === null ||
      second === undefined
    ) {
      return first === second;
    }

    if (first.constructor !== second.constructor) {
      return false;
    }

    if (first instanceof Function || first instanceof RegExp) {
      return first === second;
    }

    if (first === second || first.valueOf() === second.valueOf()) {
      return true;
    }

    if (first instanceof Date) return false;

    if (Array.isArray(first) && first.length !== second.length) {
      return false;
    }

    if (!(first instanceof Object) || !(second instanceof Object)) {
      return false;
    }

    const firstKeys = Object.keys(first);

    const allKeysExist = Object.keys(second).every(
      (i) => firstKeys.indexOf(i) !== -1
    );

    const allKeyValuesMatch = firstKeys.every((i) =>
      areTheseObjectsEqual(first[i], second[i])
    );

    return allKeysExist && allKeyValuesMatch;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = { name: newName };
    const matchingObjs = persons.filter((person) =>
      areTheseObjectsEqual(newObj, person)
    );
    console.log(matchingObjs);

    if (matchingObjs.length != 0) {
      alert(`${newObj.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newObj));
      setNewName("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
