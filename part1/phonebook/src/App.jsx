import { useState, useEffect } from "react";
import axios from "axios";
import { isEqual } from "lodash";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contacts from "./services/contacts";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [PersonsData, SetPersonsData] = useState([]);
  const filteredPersons = PersonsData.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );


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
      contacts.create(newObj).then(
        newContact => {
          console.log("response is", newContact)
          SetPersonsData(PersonsData.concat(newContact));
          setNewName("");
          setNewNumber("");
        }
      )

     
    }
  };

  const handleDelete = (id) =>{
console.log("DELETING CONTACT...");
const deletedPersonName = PersonsData.find(person => person.id === id).name
const confirmDeletion = window.confirm(`Are you sure you wanna delete ${deletedPersonName}`)

if (confirmDeletion){
  contacts.deleteContact(id).then(
    deletedContact => {
      console.log(deletedContact.name, " is deleted");
     const updatedContactAfterDelete = PersonsData.filter(person => person.id !== deletedContact.id)
      SetPersonsData(updatedContactAfterDelete)
    }
  )
} else{
  console.log(deletedPersonName, " was not deleted")
}

  }
  useEffect(() => {
    console.log("Effect started");
    contacts.getAll().then(
      initialContacts =>{
        console.log("INITIAL CONTACT", initialContacts);
        SetPersonsData(initialContacts);
      }
    )
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;
