import { Outlet } from 'react-router-dom'
import {Navbar, Footer} from "./component/index.js"

function App() {
  return (
    <div>
    <Navbar/>
    <Outlet />
    </div>
  )
}

export default App
