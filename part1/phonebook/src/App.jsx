import { useState, useEffect } from "react";
import axios from "axios";
import { isEqual } from "lodash";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [PersonsData, SetPersonsData] = useState([]);
  const filteredPersons = PersonsData.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );
const baseUrl = "http://localhost:3001/persons"

  // on submit:
  // send newObj to jsonserver
  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = { name: newName, number: newNumber };
    const matchingObjs = PersonsData.filter((person) =>
      isEqual(newObj, person)
    );
    console.log(matchingObjs);

    if (matchingObjs.length != 0) {
      alert(`${newObj.name} is already added to phonebook`);
    } else {
      axios.post(baseUrl, newObj).then(
        response => {
          console.log("response is", response.data)
          SetPersonsData(PersonsData.concat(response.data));
          setNewName("");
          setNewNumber("");
        }
      )

     
    }
  };

  useEffect(() => {
    console.log("Effect started");
    axios.get(baseUrl).then((response) => {
      console.log(response.data);
      SetPersonsData(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
