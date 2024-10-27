import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
};

export const showSuccessToast = (message) => {
  toast.success(message, toastOptions);
};

export const showErrorToast = (message) => {
  toast.error(message, toastOptions);
};

export const Toast = () => <ToastContainer />;
