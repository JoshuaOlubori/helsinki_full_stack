import { useState } from "react";

const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text} </td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />

      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={neutral} />
      <StatisticLine text="positive" value={`   ${positive * 100}%`} />
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood((prev) => prev + 1);
  const handleBad = () => setBad((prev) => prev + 1);
  const handleNeutral = () => setNeutral((prev) => prev + 1);

  const all = good + bad + neutral;

  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? good / all : 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handler={handleGood} />
      <Button text="neutral" handler={handleNeutral} />

      <Button text="bad" handler={handleBad} />

      <h2>Statistics</h2>

      {all == 0 ? (
        <p>No feedback given yet</p>
      ) : (
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          all={all}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

export default App;
