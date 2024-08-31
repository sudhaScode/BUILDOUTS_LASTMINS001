
import './App.css';
import { useEffect, useState } from 'react';
import { API } from './endpoints';
import DropDown from "./components/DropDown"
let initialState = {
  selected :"",
  data :[]
}
function App() {
  const [countries, setCountries] = useState(initialState)
  const [states, setStates] = useState(initialState)
  const [cities, setCities] = useState(initialState)


  const fetchAPI =async(API)=>{
       try{
        const response = await fetch(API);
  
        if (response.ok){
          const data = await response.json()
          return data;
        }
       }
       catch (e){
        console.error("Fecth failed", e)
        return []        
       }
  }
  const updateHandler =(name, value)=>{
    if(!(value.includes("Select") || value === "N/A")){
      if(name === "Select Country"){
        setCountries(prev=>({...prev, selected:value}))
      }
      else if(name === "Select State"){
        setStates(prev=>({...prev, selected:value}))
      }
      else{
        setCities(prev=>({...prev, selected:value}))
      }
  }
  }
  const resetHandler=(name)=>{
    if( states.selected && name === "Select Country"){
      setCountries(prev=>({...prev, selected:""}))//makes state disable
      setStates(prev=>({...prev, selected:""}))//makes countries disable
      setCities(prev=>({...prev, selected:""}))//makes summary disable
    }
    if(cities.selected && name === "Select State"){
      setStates(prev=>({...prev, selected:""}))//makes countries disable
      setCities(prev=>({...prev, selected:""}))//makes summary disable
    }
  }
  useEffect(()=>{
    const conapi = `${API}/countries`
    const updater =async()=>{
      const data =await fetchAPI(conapi)
      setCountries({selected:'', data:data})
    }
    updater()
      
  },[])

  useEffect(()=>{
    const conapi = `${API}/country=${countries.selected}/states`
   
  if(countries.selected){
    const updater =async()=>{
      const data =await fetchAPI(conapi)
      // console.log(countries.selected, conapi, data)
      setStates({selected:'', data:data})
    }
    updater()
  }
  },[countries.selected])
  
  useEffect(()=>{
   if(states.selected){
    const conapi = `${API}/country=${countries.selected}/state=${states.selected}/cities`
    console.log(conapi)
    const updater =async()=>{
      const data =await fetchAPI(conapi)
      setCities({selected:'', data:data})
    }
    updater()
   }
  },[states.selected])
  return (
    <><h2>Select Location</h2>
    <div className="App">
       <DropDown name={"Select Country"} data={countries.data} key={"countries"} updater={updateHandler} reset={resetHandler}/>
       <DropDown name={"Select State"}data={states.data} selected={countries.selected}  key="states" updater={updateHandler} reset={resetHandler}/>
       <DropDown name={"Select City"}data={cities.data} selected={states.selected} key="cities" updater={updateHandler} reset={resetHandler}/>

    </div>
    {cities.selected &&<>
        <p>You selected {cities.selected}, {states.selected}, {countries.selected}</p>
      </>}
    </>
  );
}

export default App;