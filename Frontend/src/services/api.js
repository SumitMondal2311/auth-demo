import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URL is not defined in .env file");
}

export const signupResponse = async (providedData) => {
  const response = await axios.post(`${BACKEND_URL}/signup`, providedData);

  return response;
};

export const loginResponse = async (providedData) => {
  const response = await axios.post(`${BACKEND_URL}/login`, providedData);

  return response;
};

export const forgotPasswordResponse = async (email) => {
  const response = await axios.post(`${BACKEND_URL}/forgot-password`, email);

  return response;
};

export const resetPasswordResponse = async (providedData) => {
  const { resetToken, newPassword } = providedData;
  const response = await axios.post(
    `${BACKEND_URL}/reset-password/${resetToken}`,
    { newPassword }
  );

  return response;
};
