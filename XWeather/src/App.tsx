import { fetchAPI } from "./constants"
import "./App.css"
import { SyntheticEvent, useState } from "react"

interface City{
  temparature: number,
  condition:string,
  wind_speed: number,
  humidity: number
}
interface StatsProps{
  title: string
   stat: string | undefined
}
const StatsCard:React.FC<StatsProps>=({title, stat})=>{

  return(
    <div className="weather-card">
      <h3>{title}</h3>
      <h3>{stat}</h3>
    </div>
  )

}
function App() {
const [isSubmitted, setIsSubmitted] = useState("Not Submitted")
const [details, setDetails] = useState<City>()

const submitHandler=async(e:SyntheticEvent)=>{
  e.preventDefault()
  setIsSubmitted("Submitting")
  const target = e.target as typeof e.target & {
    city: { value: string };
  };
  const data = await fetchAPI(target.city.value);
  if (!data){
    window.alert("Failed to fetch weather data")
    setIsSubmitted("Not Submitted")
    return
  }
  setIsSubmitted("Submitted")
  const {humidity, condition, wind_kph, temp_c,} = data.current
  const cityDetails = {
    temparature: temp_c,
    condition: condition.text,
    humidity: humidity,
    wind_speed: wind_kph
  }
   setDetails(cityDetails)
}
  return (
    <div className="App">
        <form onSubmit={submitHandler}>
          <input type="text" required placeholder="Enter city name" autoFocus className="city-input" name="city"/>
          <button type="submit" className="city-submit">Search</button>
        </form>
        {isSubmitted==="Submitting" && <p>Loading data...</p>}
        {isSubmitted==="Submitted" && <div className="weather-cards">
          <StatsCard title={"Temperature"} stat={`${details?.temparature}°C`}/>
          <StatsCard title={"Humidity"} stat={`${details?.humidity}%`}/>
          <StatsCard title={"Condition"} stat={`${details?.condition}`}/>
          <StatsCard title={"Wind Speed"} stat={`${details?.wind_speed} kph`}/>
        </div>}
    </div>
  )

}
export default App