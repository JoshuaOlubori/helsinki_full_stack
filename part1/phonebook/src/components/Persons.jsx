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
