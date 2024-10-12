import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (good / total) * 100;

  //
  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };
  //
  const StatisticLine = ({ text, value }) => (
    <>
      <tr>
        <td>{text}</td> <td>{value}</td>
      </tr>
    </>
  );
  const Statistics = ({ good, neutral, bad, all, average, positive }) => (
    <>
      <h2>statistics</h2>

      <table>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={total} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive} />
      </table>
    </>
  );

  const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>{text}</button>
  );

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handleClick={handleGood} />
      <Button text={"neutral"} handleClick={handleNeutral} />
      <Button text={"bad"} handleClick={handleBad} />

      {total ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          average={average}
          positive={positive}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
