import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'Good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={'Neutral'}/>
      <Button handleClick={() => setBad(bad + 1)} text={'Bad'}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
) 

const StatisticLine = ({text,value}) =>{
  return (
    <>
      <td> {text}</td>
      <td> {value}</td>
    </>  

  )

}
const Statistics = ({good,neutral,bad}) => {

  const sum = good + bad + neutral

  if(sum === 0){
    return(
    <div>
      No feedback given
    </div>
    )

  }
  return (
    <table>
      <tbody>
        <tr><StatisticLine text="Good" value ={good}/></tr>
        <tr><StatisticLine text="Neutral" value ={neutral}/></tr>
        <tr><StatisticLine text="Bad" value ={bad}/></tr>
        <tr><StatisticLine text="All" value ={sum}/></tr>
        <tr><StatisticLine text="Average" value ={(good - bad) / sum}/></tr>
        <tr><StatisticLine text="Positive" value ={good/sum*100 + "%"}/></tr>
      </tbody>
    </table>
  )
}

export default App
