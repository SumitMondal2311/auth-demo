import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import {
  showErrorToast,
  showSuccessToast,
  Toast,
} from "../components/common/ToastMessage";
import { forgotPasswordResponse } from "../services/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      return showErrorToast("Email field is required");
    }

    setLoading(true);
    try {
      const response = await forgotPasswordResponse({ email });
      if (response.status === 200) {
        setEmail("");
        showSuccessToast(`A Password reset link has been sent to ${email}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      showErrorToast(errorMessage || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="h-3/5 w-2/5 bg-sky-100 rounded-2xl flex flex-col gap-8 justify-center items-center shadow-lg">
          <ForgotPasswordForm
            email={email}
            loading={loading}
            setEmail={setEmail}
            handleForgotPassword={handleForgotPassword}
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
