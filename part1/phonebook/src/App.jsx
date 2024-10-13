import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contacts from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [PersonsData, SetPersonsData] = useState([]);
  const filteredPersons = PersonsData.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );
  const[ notificationMessage, setNotificationMessage] = useState("");

  // on submit:
  // send newObj to jsonserver
  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = { name: newName, number: newNumber };
    // const matchingObjs = PersonsData.filter((person) =>
    //   isEqual(newObj, person)
    // );

    const matchingObjs = PersonsData.filter((person) =>
      person.name === newObj.name);
    console.log(matchingObjs);
    // if (matchingObjs.length != 0 && (matchingObjs[0].name === newObj.name)){
    //   alert(`${newObj.name} is already added to phonebook`);
    // }

    if (matchingObjs.length != 0) {
      alert(`${newObj.name} is already added to phonebook, replace the old number
        with a new one?`);
      contacts.update(matchingObjs[0].id, newObj).then(
        updatedContact => {
          console.log(updatedContact.name, "has been updated");
          SetPersonsData(PersonsData.map(p => p.id === matchingObjs[0].id ? updatedContact : p))
          setNewName("");
          setNewNumber("");
          setNotificationMessage(`${updatedContact.name} is updated`)
          setTimeout(()=>{ setNotificationMessage(null)},2000)
        }
      )
    } else {
      contacts.create(newObj).then(
        newContact => {
          console.log("response is", newContact)
          SetPersonsData(PersonsData.concat(newContact));
          setNewName("");
          setNewNumber("");
          setNotificationMessage(`Added ${newContact.name}`)
          setTimeout(()=>{ setNotificationMessage(null)},2000)
        }
      )


    }
  };

  const handleDelete = (id) => {
    console.log("DELETING CONTACT...");
    const deletedPersonName = PersonsData.find(person => person.id === id).name
    const confirmDeletion = window.confirm(`Are you sure you wanna delete ${deletedPersonName}`)

    if (confirmDeletion) {
      contacts.deleteContact(id).then(
        deletedContact => {
          console.log(deletedContact.name, " is deleted");
          const updatedContactAfterDelete = PersonsData.filter(person => person.id !== deletedContact.id)
          SetPersonsData(updatedContactAfterDelete)
        }
      )
    } else {
      console.log(deletedPersonName, " was not deleted")
    }

  }
  useEffect(() => {
    console.log("Effect started");
    contacts.getAll().then(
      initialContacts => {
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
      <Notification message={notificationMessage} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
