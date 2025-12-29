import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../store/Store";

export const UnAuthenticatedRoutes = () => {
  const { user, loading } = useAppContext();

  if (loading) return null;

  return user ? <Navigate to="/home" replace /> : <Outlet />;
};