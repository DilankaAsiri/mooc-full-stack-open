import { useState } from "react";

const Feedback = ({ onClickGood, onClickNeutral, onClickBad }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={onClickGood}>good</button>
      <button onClick={onClickNeutral}>neutral</button>
      <button onClick={onClickBad}>bad</button>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (!all) {
    return <p>No feedback given</p>;
  }

  const average = (good + bad * -1) / all;
  const postive = (good / all) * 100;

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>postive {postive} %</p>
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
