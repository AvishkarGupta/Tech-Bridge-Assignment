import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../store/Store";

export const UnAuthenticatedRoutes = () => {
  const { user } = useAppContext();
  return user ? <Navigate to="/home" replace /> : <Outlet />;
};