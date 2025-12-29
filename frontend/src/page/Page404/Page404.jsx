import { useNavigate } from "react-router-dom";
import styles from "./Page404.module.css";

export function Page404() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.title}>Oops! Page not found</p>
        <p className={styles.subtitle}>
          The page you are looking for doesn’t exist or was moved.
        </p>

        <button
          className={styles.button}
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}