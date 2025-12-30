import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [projects, setProjects] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

    setHydrated(true);
  }, []);
  
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setProjects(null);
    localStorage.removeItem("user");
  };

  const allProject = (data) =>{
    setProjects(data);
  }

  return (
    <AppContext.Provider value={{ user, login, logout, hydrated, projects, allProject }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);