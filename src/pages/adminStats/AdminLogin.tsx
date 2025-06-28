import Form from "../../components/AdminLogin/Form/Form";
import { Navigate } from "react-router-dom";
import Title from "../../components/AdminLogin/Title/Title";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";

const AdminLogin = () => {
  const [pseudo, setPseudo] = useState("");
  const [pass, setPass] = useState("");
  const [error] = useState("");

  const { isAuthenticated, login, loading } = useAuthStore();

  const handleLogin = async () => {
    login(pseudo, pass);
  };
  if (isAuthenticated) {
    return <Navigate to="/adminStats" />;
  }
  return (
    <div className="bg-form">
      <div className="container-fluid position-relative">
        <Title />
        <Form
          pseudo={pseudo}
          setPseudo={setPseudo}
          pass={pass}
          setPass={setPass}
          onSubmit={handleLogin}
          loading={loading}
          error={error}
        />
      </div>
      <div className="d-flex justify-content-center p-2 bg-dark mt-5">
        <span className="uppercase">thatmuch</span>
      </div>
    </div>
  );
};

export default AdminLogin;
