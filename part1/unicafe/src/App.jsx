import { useState } from "react";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Feedback = ({ onClickGood, onClickNeutral, onClickBad }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={onClickGood}></Button>
      <Button text="neutral" onClick={onClickNeutral}></Button>
      <Button text="bad" onClick={onClickBad}></Button>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (!all) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  const average = (good + bad * -1) / all;
  const postive = (good / all) * 100;

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="postive" value={postive} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Feedback
        onClickGood={() => setGood(good + 1)}
        onClickNeutral={() => setNeutral(neutral + 1)}
        onClickBad={() => setBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
