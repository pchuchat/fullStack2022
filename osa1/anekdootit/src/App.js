import { useState } from 'react'

const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const ylaAnecdote = votes.indexOf(Math.max(...votes))


  const updateSelected = () => {
    const randNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randNumber)
  }

  const voteSelected = () => {
    const points = [...votes]
    points[selected] += 1
    setVotes(points)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteSelected}>Vote</button>
      <button onClick={updateSelected}>next anecdote</button>


      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[ylaAnecdote]}</p>
      <p>has {votes[ylaAnecdote]} votes</p>
    </div>
  )
}

export default App;

