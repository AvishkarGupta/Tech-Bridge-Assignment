import { Link } from "react-router-dom"
import {useAppContext} from "../../store/Store"
import styles from "./Navbar.module.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export function Navbar(){

  const {user, logout} = useAppContext()
  console.log(user?.refreshToken)
  const items = [
    {
      name: "Contact us",
      to: "contact"
    },
    {
      name: "About us",
      to: "about"
    },
  ]
  const LogInItems = [
    {
      name: "Projects",
      to: "projects-dashboard"
    }
  ]

  const handleLogOut = async() => {
    const response = await axios.get(`${API_URL}/api/v1/users/logout`,{
    headers: {
      authorization: `Bearer ${user.refreshToken}`,
      "Content-Type": "application/json"
    }})

    console.log(response.data.message)
    if(response.data.message === "User Logged Out"){
      logout()
    }

  }

  return (
    <nav className={styles.navbar}>
      {user? 
      LogInItems.map( (item) =>{
        return (
          <div key={item.name}>
            <Link className={styles.items} to={item.to}>{item.name}</Link>
          </div>
        )
      } )
      : 
      items.map( (item) =>{
        return (
          <div key={item.name}>
            <Link className={styles.items} to={item.to}>{item.name}</Link>
          </div>
        )
      } )}
      {user?
      <Link onClick={handleLogOut} className={styles.button}>Log Out</Link>
      :
      <Link to={"login"} className={styles.button}>Log in</Link>
      }
    </nav>
  )
}