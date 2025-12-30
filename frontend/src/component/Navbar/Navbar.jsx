import { Link, NavLink } from "react-router-dom"
import {useAppContext} from "../../store/Store"
import styles from "./Navbar.module.css";
import axios from "axios";
import { asyncHandler } from "../../AsyncHandler/asyncHandler";
const API_URL = import.meta.env.VITE_API_URL;

export function Navbar(){

  const {user, logout} = useAppContext()

  const navConfig = {
    public: [
      { name: "Contact us", to: "/contact" },
      { name: "About us", to: "/about" },
    ],
    private: [
      { name: "Projects", to: "/projects" },
      { name: "Create Project", to: "/create-project" },
      { name: "All Test", to: "/tests" },
      { name: "Create Tests", to: "/create-tests" },
      { name: "Profile", to: "/profile" },
      { name: "Home", to: "/home" },
    ],
  };

  const navItems = user ? navConfig.private : navConfig.public;

const handleLogout = asyncHandler(
  async () => {
    await axios.get(`${API_URL}/api/v1/users/logout`, {
      headers: {
        Authorization: `Bearer ${user?.refreshToken}`,
      },
    });

    logout();
  },
  () => logout() // fallback
);

  return (
    <nav className={styles.navbar}>
      <div className={""}>
        {navItems.map(({ name, to }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              `${styles.links} ${isActive ? styles.active : ""}`
            }
          >
            {name}
          </NavLink>
        ))}
      </div>

      <div className={styles.actions}>
        {user ? (
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        ) : (
          <Link to="/login" className={styles.button}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}