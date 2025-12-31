import axios from "axios";
import { asyncHandler } from "../../AsyncHandler/asyncHandler";
import styles from "./Home.module.css";
import { lazy, Suspense, useContext, useEffect, useState } from "react"
import { useAppContext } from "../../store/Store";
const API_URL = import.meta.env.VITE_API_URL;
const LineChart = lazy(()=>{
  return import("../../component/Charts/LineChart.jsx")
})

export function Home(){

  const {user, projects, allProject} = useAppContext()
 
  const handlefetch = asyncHandler( async() =>{
    const response = await axios.get(`${API_URL}/api/v1/project/get-all`, {
      headers: {
        authorization: `Bearer ${user.refreshToken}`
      }
    })

    if(response.data.message === "All projects"){
      allProject(response.data.data);
    }

  } )

  useEffect( ()=>{
    handlefetch()
  },[] )
  
  return (
    <div className={styles.conatiner}>
      <header>
        <h1 className={styles.firstheading}>
          Charts and Rechart Implementation
        </h1>
      </header>
      <p className={styles.text}>Currently I'm using hard coded values for charts (<b>only for charts</b>). Once the application completed. I will replace values per the DB response.</p>
      <Suspense fallback={<div>Loading attachment...</div>}>
        <LineChart/>
      </Suspense>

    </div>
  )
}
