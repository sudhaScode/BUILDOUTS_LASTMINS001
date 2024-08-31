import { useEffect } from "react";
import "../App.css"

function DropDown({name, selected, data, updater, reset}){
    // if(name === "Select State"){
    //     console.log(name, selected)
    // }
    return(
        <select disabled={selected ===""} onChange={(event)=>updater(name, event.target.value)} onClick={()=>reset(name)} className="select">
            <option key={name}>{name}</option>
            {data&& data.map((value,index)=>
            <option key={`${index}${value}`} value={value}>{value}</option>)}
        </select>
    )
}
export default DropDown;