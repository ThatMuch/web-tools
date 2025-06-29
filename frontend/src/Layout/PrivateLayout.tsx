import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../stores/authStore";

const PrivateLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/analyse-refonte-site-web/login" replace />;
  }

  return <Outlet />;
};

export default PrivateLayout;
