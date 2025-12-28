import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import {useAppContext} from "../../store/Store.jsx" 

const API_URL = import.meta.env.VITE_API_URL;

export function Login(){

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

  const handleLogIn = async(e) => {
    e.preventDefault()
    console.log(input)
    const response = await axios({method: 'post', url: `${API_URL}/api/v1/users/login`, data:input})
    console.log(response.data.data)
    login(response.data.data)

  }

  return(
    <div className={styles.container}>
      <div className={styles.loginSection}>
          <form className={styles.form} action="">
            <input onChange={(e) => handleInput(e)} className={styles.input} type="email" name="email" placeholder="email" />
          <input onChange={(e) => handleInput(e)} className={styles.input} type="password" name="password" placeholder="password" />
          <button onClick={(e) => handleLogIn(e)} className={styles.button}>
            Login
          </button>
          </form>
      </div>
    </div>
  )
}
