import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import {
  showErrorToast,
  showSuccessToast,
  Toast,
} from "../components/common/ToastMessage";
import { loginResponse } from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return showErrorToast("All fields are required");
    }

    try {
      const response = await loginResponse({ email, password });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("firstName", response.data.firstName);

        setEmail("");
        setPassword("");

        showSuccessToast("Logged in successfully");

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      showErrorToast(errorMessage || "Internal server error");
    }
  };

  return (
    <>
      <Toast />
      <div className="h-screen w-screen flex flex-col justify-center items-center shadow-lg animate-[pulse-1s]">
        <div className="h-2/3 w-1/2 bg-sky-100 rounded-2xl flex flex-col gap-8 justify-center items-center shadow-lg">
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
          <div className="flex gap-2">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <span className="text-blue-600">Signup</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
