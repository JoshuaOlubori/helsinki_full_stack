const Filter = ({ newSearch, setNewSearch }) => {
  return (
    <p>
      filter shown with a{" "}
      <input
        type="text"
        value={newSearch}
        onChange={(e) => {
          setNewSearch(e.target.value);
        }}
      />
    </p>
  );
};

export default Filter;
