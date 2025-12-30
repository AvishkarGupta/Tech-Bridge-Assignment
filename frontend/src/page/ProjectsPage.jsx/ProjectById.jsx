import { useParams } from "react-router-dom"
import styles from "./ProjectById.module.css"
import { asyncHandler } from "../../AsyncHandler/asyncHandler"
import { lazy, Suspense, useEffect, useState } from "react"
import axios from "axios"
import { useAppContext } from "../../store/Store"
const API_URL = import.meta.env.VITE_API_URL;
const AttachmentPreview = lazy(() =>
  import("../../component/AttachmentPreview/AttachmentPreview")
);

export function ProjectById(){

  const [project, setProject] = useState({})
  const {user} = useAppContext();
  const {id} = useParams()

  const getProject = asyncHandler( async(id)=>{
    const response = await axios.get(`${API_URL}/api/v1/project/get-project/${id}`, {
      headers:{
        authorization: `Bearer ${user.refreshToken}`,
      }
    })

    console.log(response);
    setProject(response.data.data)
  } )

  useEffect( ()=>{
    getProject(id)
    console.log("calling project data")
  }, [id] )

  return(
    <div className={styles.container}>
      <div key={project.title} onClick={(e) => handleProjectNavigation(e, project)} className={styles.project}>
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
    </div>
  )
}