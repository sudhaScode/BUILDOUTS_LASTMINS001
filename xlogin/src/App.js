import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const creadentials ={
  username:"user",
  password:"password"
}

function App() {

  const [isValidate, setIsValidate] = useState("")
  // const [password, setPassword] = useState("")
  const submitHandler=(event)=>{
      event.preventDefault()
      const username = event.target.username.value ===creadentials.username
      const password = event.target.password.value === creadentials.password
      if(username && password){
         setIsValidate("Submitted")
      }
      else{
        setIsValidate("error")
      }
  }
  return (
    <div className="App">
      <h3>Login Page</h3>
      {isValidate ==="error" && <p>Invalid username or password</p>}
     {isValidate === "Submitted"?<><h4>Welcome, user!</h4></>:
      <form onSubmit={submitHandler}>
        <div>
        <label htmlFor="username">Username:</label>
        <input type='text' id = "username" name = "username" required placeholder='username' autoFocus onChange={()=>setIsValidate("")}/>
        </div>
        <div>
        <label htmlFor="password">Password:</label>
        <input type='password' id ="password" name="password" required placeholder='password' onChange={()=>setIsValidate("")}/>
        </div>
      <button type='submit'>Submit</button>
    </form>}

    </div>
  );
}

export default App;
