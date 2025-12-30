import axios from "axios";
import styles from "./Projects.module.css"
import { useEffect, useState, lazy, Suspense } from "react";
import { useAppContext } from "../../store/Store";
import { asyncHandler } from "../../AsyncHandler/asyncHandler";
import {useNavigate} from "react-router-dom"
const AttachmentPreview = lazy(() =>
  import("../../component/AttachmentPreview/AttachmentPreview")
);
const API_URL = import.meta.env.VITE_API_URL;

export function Projects(){

  const navigate = useNavigate()
  const {user} = useAppContext()
  const [data, setData] = useState([])
  const {projects} = useAppContext();

  const handlefetch = asyncHandler( async() =>{
    const response = await axios.get(`${API_URL}/api/v1/project/get-all`, {
      headers: {
        authorization: `Bearer ${user.refreshToken}`
      }
    })

    console.log(response)
    if(response.data.message === "All projects"){
      setData(response.data.data)
    }

  } )

  useEffect( ()=>{
    handlefetch()
  }, [])

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.firstHeading}>
          Project Dashboard
        </h1>
      </header>
      <div className={styles.containerdiv}>
        {data?.map( (project) =>{
          return (
            <div 
              key={project.title} 
              onClick={(e) => navigate(project._id)} className={styles.project}
            >
              <div className={styles.title}>{project.title}</div>
              <div className={styles.version}>{project.version}</div>
              <div className={styles.description}>{project.description}</div>
              <div className={styles.status}>{project.status}</div>
              {project?.attachment?.length > 0 && (
                <Suspense fallback={<div>Loading attachment...</div>}>
                  <AttachmentPreview file={project.attachment[0]} />
                </Suspense>
              )}
              {project.testcases?.map(() =>{
                return <></>
              })}
            </div>
          )
        } )}
      </div>
    </div>
  )
}