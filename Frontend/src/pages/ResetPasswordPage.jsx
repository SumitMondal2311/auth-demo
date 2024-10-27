import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import {
  showErrorToast,
  showSuccessToast,
  Toast,
} from "../components/common/ToastMessage";
import { resetPasswordResponse } from "../services/api";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return showErrorToast("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return showErrorToast("Passwords do not match");
    }

    try {
      const response = await resetPasswordResponse({ resetToken, newPassword });

      if (response.status === 200) {
        setNewPassword("");
        setConfirmPassword("");
        showSuccessToast("Password successfully reset");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      showErrorToast(errorMessage);
    }
  };
  return (
    <>
      <Toast />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="h-3/5 w-2/5 bg-sky-100 rounded-2xl flex flex-col gap-8 justify-center items-center shadow-lg">
          <ResetPasswordForm
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            setNewPassword={setNewPassword}
            setConfirmPassword={setConfirmPassword}
            handleResetPassword={handleResetPassword}
          />
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
