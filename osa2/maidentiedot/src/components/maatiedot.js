import { useState } from "react"
import axios from "axios"
import kelvinToCelsius from "../asteet/kelvin"

const Maantiedot = ({country}) => {

    const [temperature, setTemperature] = useState(0)

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${
        process.env.REACT_APP_API_KEY}`)
        .then(response => {
            console.log(response.data)
            setTemperature(
                Math.round(kelvinToCelsius(response.data.main.temp)*10)/10
                
            )
        })
    return(
        
    <>
    <h1 >{country.name}</h1>
    <div>Capital: {country.capital[0]}</div>
    <div>Area: {country.area}</div>
    <h2> Languages:</h2>
    <ul>
     {Object.values(country.languages).map(language => 
     <li key={language}> {language}</li>)}
    </ul>
    <div><img src={country.flags.png} alt={`${country.name} flag `}/> </div>
    <h2>Weather in {country.capital[0]}</h2>
    <div>temperature {temperature} Celsius</div>
    </>




    )
}




export default Maantiedot