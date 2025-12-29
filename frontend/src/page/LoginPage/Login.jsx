import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import {useAppContext} from "../../store/Store.jsx" 
import { asyncHandler } from "../../AsyncHandler/asyncHandler.js";

const API_URL = import.meta.env.VITE_API_URL;

export function Login(){

  const [error, setError] = useState(null);
  const {login} = useAppContext()
  const [input, setInput] = useState({
    "email": "",
    "password": ""
  })

  const handleInput = (e) =>{
    console.log(e.target.value, e.target.name)
    setInput( prev => {
      return {...prev, [e.target.name]: e.target.value}
    } )
  }

const handleLogIn = asyncHandler(async (e) => {
  e.preventDefault();

  const {data} = await axios.post(
    `${API_URL}/api/v1/users/login`,
    input
  );

  login(data.data);
});
  

  // const handleLogIn = async(e) => {
  //   e.preventDefault()
  //   try {  
  //   const response = await axios({method: 'post', url: `${API_URL}/api/v1/users/login`, data:input})
  //   console.log(response.data.data)
  //   console.log(response)
  //   if(response.data.message === "User logged in successfully"){
  //     return login(response.data.data)
  //   }else{
  //     // return setError("")
  //   }
  //   // User logged in successfully
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  return(
    <div className={styles.container}>
      <div className={styles.loginSection}>
          <form className={styles.form} action="">
            <input onChange={(e) => handleInput(e)} className={styles.input} type="email" name="email" placeholder="email" />
          <input onChange={(e) => handleInput(e)} className={styles.input} type="password" name="password" placeholder="password" />
          <button onClick={(e) => handleLogIn(e).catch(err => setError(err.message))} className={styles.button}>
            Login
          </button>
          </form>
          <p className={styles.error}>{error? `Invalid Credentials`: null}<br/>{error? `${error}`: null}</p>
      </div>
    </div>
  )
}
