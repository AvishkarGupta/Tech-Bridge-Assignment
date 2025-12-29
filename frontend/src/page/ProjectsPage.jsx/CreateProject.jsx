import { useEffect, useState } from "react"
import styles from "./CreateProject.module.css"
import { asyncHandler } from "../../AsyncHandler/asyncHandler"
import axios from "axios"
import { useAppContext } from "../../store/Store";


export function CreateProject(){
  const API_URL = import.meta.env.VITE_API_URL;

  const {user} = useAppContext()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [data, setData] = useState({
    title: "",
    description: "",
    version: "",
    owner: "",
    assignee: "",
    attachment: "",
  })

  const handleInput = (e) =>{
    const { name, value, files, type } = e.target;

    setData(prev => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }));
  }

  const handlesubmit = asyncHandler( async(e)=>{
    e.preventDefault();

    console.log("formsubmitted")
    if(data.title.trim() === ""){
      return setError("Title field is required")
    }

    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    } 

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    const response = await axios.post(`${API_URL}/api/v1/project/create`, formData,{
      headers: {
        authorization: `Bearer ${user.refreshToken}`
      }
    });

    console.log(response.data.data)
    setSuccess(response.data.message)

    if(response.data.message === "Project created successfully"){
      retrun
    } 
  })

  useEffect( ()=>{
    setTimeout( () =>{
      setError(null);
      setSuccess(null);
    }, 5000 )
  }, [error, success] )

  return(
    <div className={styles.container}>
      <header>
        <h1 className={styles.firstHeading}>
          Create Project
        </h1>
      </header>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <div>
            <div className={styles.childDiv}>
              <label 
              htmlFor="title">Title</label>
              <input
                onChange={(e) => handleInput(e)} 
                id="title" 
                type="text" 
                name="title" 
                placeholder="title" 
                required
              />
            </div>
            <div className={styles.childDiv}>
              <label 
              htmlFor="version">Version</label>
              <input
                onChange={(e) => handleInput(e)}  
                id="version"
                type="text" 
                name="version" 
                placeholder="version" 
              />
            </div>
            <div className={styles.childDiv}>
              <label 
              htmlFor="owner">Owner</label>
              <input
                onChange={(e) => handleInput(e)}  
                id="owner"
                type="text" 
                name="owner" 
                placeholder="owner" 
              />
            </div>
          </div>
          <div>
            <div className={styles.childDiv}>
              <label 
              htmlFor="assignee">Assignee</label>
              <input
                onChange={(e) => handleInput(e)}  
                id="assignee"
                type="text" 
                name="assignee" 
                placeholder="assignee" 
              />
            </div>
            <div className={styles.childDiv}>
              <label 
              htmlFor="attachment">Resources</label>
              <input
                onChange={(e) => handleInput(e)}  
                id="attachment"
                type="file" 
                name="attachment" 
                placeholder="attachment" 
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.childtextArea}>
            <label 
            htmlFor="description">Description</label>
            <textarea
              onChange={(e) => handleInput(e)} 
              id="description"
              rows={3}
              type="text" 
              name="description" 
              placeholder="description" 
            />
          </div>
        </div> 
        <button onClick={(e) => handlesubmit(e).catch(err => setError(err.message) )} className={styles.createButton}>
          Create Project
        </button>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </form>
    </div>
  )
}