import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../stores/authStore";

const PrivateLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/adminLogin" replace />;
  }

  return <Outlet />;
};

export default PrivateLayout;
