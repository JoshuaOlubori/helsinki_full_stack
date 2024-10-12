import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [voteStore, setVoteStore] = useState(
    new Array(anecdotes.length).fill(0)
  );

  const handleQuote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newVotes = [...voteStore];
    newVotes[selected]++;
    setVoteStore(newVotes);
  };

  const maxValue = Math.max(...voteStore);
  const maxIndex = voteStore.indexOf(maxValue);

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <p>has {voteStore[selected]} votes</p>
      <button onClick={handleQuote}>next anecdote</button>
      <button onClick={handleVote}>vote</button>

      <h2>Anecdotes with the most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
    </>
  );
};

export default App;
