import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../store/Store";

export const Auth = () => {
  const { user } = useAppContext();
  return user ? <Outlet /> : <Navigate to="/" replace />;
};