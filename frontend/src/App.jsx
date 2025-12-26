import { useState } from 'react'
import './App.css'
import {Input} from "./component/index.js"

function App() {
  const [count, setCount] = useState(0)
  let attributsForInput = {
    type: "email", 
    name: "email", 
    readOnly: false, 
    required: true, 
    autoComplete:"email", 
    placeholder:"Enter your email", 
    autoFocus: false
  }
  return (
    <>
    <Input value={attributsForInput}/>
    </>
  )
}

export default App
