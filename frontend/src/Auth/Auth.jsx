import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../store/Store";

export const Auth = () => {
  const { user, hydrated  } = useAppContext();
  const location = useLocation();

  if (!hydrated) {
    return null;
  }

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }
  return <Outlet />
};