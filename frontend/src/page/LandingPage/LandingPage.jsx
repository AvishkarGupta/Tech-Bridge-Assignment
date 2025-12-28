import styles from "./LandingPage.module.css";
export function LandingPage(){

  const features = [
    "User registration and login",
    "JWT-based authentication",
    "Protected routes",
    "Role-Based Access Control (RBAC)",
    "Track execution progress",
    "Lazy loading for different pages/components",
    "Pagination for test case lists",
    "Caching for frequently accessed data",
    "Rate limiting for API endpoints",
    "Virtual scrolling for large test case lists"
  ]
  

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.firstHeading}>
          Full Stack Test Case Management System - Assignment
        </h1>
      </header>
      <h2>
        Key Features:
      </h2>
      <ul>
        {features?.map( (fea) =>{
          return <li className={styles.listItem} key={fea}>
            {fea}
          </li>
        } )}
      </ul>
    </div>
  )
}
