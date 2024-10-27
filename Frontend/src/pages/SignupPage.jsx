import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import {
  showErrorToast,
  showSuccessToast,
  Toast,
} from "../components/common/ToastMessage";
import { signupResponse } from "../services/api";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      return showErrorToast("All fields are required");
    }

    try {
      const response = await signupResponse({
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        showSuccessToast("Signed up successfully");

        setTimeout(() => {
          navigate("/login");
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
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="h-2/3 w-1/2 bg-sky-100 rounded-2xl flex flex-col gap-8 justify-center items-center shadow-lg">
          <SignupForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSignup={handleSignup}
          />
          <div className="flex gap-2">
            <p>Already have an account?</p>
            <Link to="/login">
              <span className="text-blue-600">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
