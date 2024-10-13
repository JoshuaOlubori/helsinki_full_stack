<<<<<<< HEAD
const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <span>{person.name}</span>:<span>{person.number}</span>
        </div>
      ))}
    </>
  );
};

export default Persons;
=======
const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <span>{person.name}</span>:<span>{person.number}</span>
        </div>
      ))}
    </>
  );
};

export default Persons;
>>>>>>> aa92640 (initial commit)
