import { useState } from "react";

const getRandomInt = (max) => Math.floor(Math.random() * max);

const Anecdote = ({ data }) => {
  return (
    <div>
      <p>{data.text}</p>
      <p>has {data.vote} votes</p>
    </div>
  );
};

const AnecdoteVote = ({ anecdoteData, onVote, onNextAnecdote }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote data={anecdoteData}></Anecdote>
      <button onClick={onVote}>vote</button>
      <button onClick={onNextAnecdote}>next anecdote</button>
    </div>
  );
};

const AnecdoteMostVote = ({ anecdoteData, voted }) => {
  return (
    <div>
      <h1>Anecdotewith most votes</h1>
      {voted ? <Anecdote data={anecdoteData}></Anecdote> : <p>No Votes!</p>}
    </div>
  );
};

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
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [voted, setVoted] = useState(false);

  const setNewAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  const handleVote = () => {
    const _votes = [...votes];
    _votes[selected] += 1;
    setVotes(_votes);
    setVoted(true);
  };

  const getSelected = () => {
    return {
      text: anecdotes[selected],
      vote: votes[selected],
    };
  };

  const getMostVote = () => {
    const indexOfMax = votes.indexOf(Math.max(...votes));
    return {
      text: anecdotes[indexOfMax],
      vote: votes[indexOfMax],
    };
  };

  return (
    <div>
      <AnecdoteVote
        anecdoteData={getSelected()}
        onVote={handleVote}
        onNextAnecdote={setNewAnecdote}
      />
      <AnecdoteMostVote anecdoteData={getMostVote()} voted={voted} />
    </div>
  );
};

export default App;
