const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <span>{person.name}</span>:<span>{person.number}</span>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
