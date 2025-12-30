import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom"
import App from './App.jsx'
import { AppProvider } from './store/Store.jsx'
import { Home, LandingPage, Login, Projects, Testing, Page404, CreateProject, ProjectById} from './page/index.js'
import { Auth } from "./Auth/Auth.jsx"
import { UnAuthenticatedRoutes } from "./Auth/UnAuthenticatedRoutes.jsx"

const router = createBrowserRouter(
createRoutesFromElements(
    <Route element={<App/>}>

       {/* Public routes */}
      <Route element={<UnAuthenticatedRoutes/>}>
        <Route index element={<LandingPage/>} />
        <Route path='login' element={<Login />} />
      </Route>

      {/* Protected routes */}
      <Route element={<Auth/>}>
        <Route path='home' element={<Home/>} />
        <Route path='testing' element={<Testing/>} />
        <Route path='projects' element={<Projects/>} />
        <Route path='projects/:id' element={<ProjectById/>} />
        <Route path='create-project' element={<CreateProject/>} />
      </Route>
      {/* page 404 */}
      <Route path="*" element={<Page404 />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
    <AppProvider>
      <RouterProvider id="main" router={router} />
  </AppProvider>
)
