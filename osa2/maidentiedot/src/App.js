import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(res => {
       console.log(res.data)
      })
  }, [])

  return <div >Hello Word!</div>
}

export default App;
