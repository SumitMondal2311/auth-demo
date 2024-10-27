import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserFirstName(localStorage.getItem("userFirstName"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userFirstName");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <div className="navbar">
        <h1>Welcome, {userFirstName}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
