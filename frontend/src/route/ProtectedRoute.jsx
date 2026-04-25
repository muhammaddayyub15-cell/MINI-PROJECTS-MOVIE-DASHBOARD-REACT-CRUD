import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";

export default function ProtectedRoute({ role }) {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" />;

  // chhek role authenticated user
  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}