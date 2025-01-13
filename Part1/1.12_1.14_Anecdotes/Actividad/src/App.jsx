import { useState } from "react";
import "./App.css";

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>Anecdote: {anecdote}</p>
      <p>Votes: {votes}</p>
    </>
  );
};

const Winner = ({anecdote, votes}) =>{
  return(
    <>
      <h2>Anecdote with most votes</h2>
      <p>The winner is: {anecdote}</p>
      <p>The winner's votes: {votes}</p>
    </>
  )
}

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState({
    a1:0,
    a2:0,
    a3:0,
    a4:0,
    a5:0,
    a6:0,
    a7:0,
    a8:0
  })

  const [index, setIndex] = useState(0);
  let random = 0;
  const min = 0;
  const max = anecdotes.length - 1;
  let index_obj = "a"+(index+1)
  let aux_win = 0
  let winner = "a1"
  
  for(let [clave,valor] of Object.entries(votes)){
    if(valor>aux_win){
      aux_win = valor
      winner = clave
    }
  }

  let index_win = parseInt(winner.slice(1))-1


  const clicGenerateRandom = () => {
    random = parseInt(Math.random() * (max - min + 1) + min);
    setIndex(random);
  };

  const clicVotar = () => setVotes({...votes,[index_obj]:votes[index_obj] + 1})
  
  return (
    <>
      <h1>Anecdote of the day</h1>
      <button className="btn btn-primary border-white border-2" onClick={clicGenerateRandom}>Random Anecdote</button>
      <button className="btn btn-success border-white border-2" onClick={clicVotar}>Vote</button>
      <Anecdote anecdote={anecdotes[index]} votes={votes[index_obj]} />
      <Winner anecdote={anecdotes[index_win]} votes={votes[winner]}/>
    </>
  );
}

export default App;
