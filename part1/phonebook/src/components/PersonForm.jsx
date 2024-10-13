const PersonForm = ({
  handleSubmit,
  setNewName,
  setNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </p>
        <p>
          {" "}
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => {
              setNewNumber(e.target.value);
            }}
          />
        </p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
