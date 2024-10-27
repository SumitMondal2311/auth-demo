import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import InputField from "../common/InputField";
import PasswordField from "../common/PasswordField";

const LoginForm = (props) => {
  const { email, password, setEmail, setPassword, handleLogin } = props;

  return (
    <form
      className="w-1/2 flex flex-col gap-4 items-center"
      onSubmit={handleLogin}
      method="post"
    >
      <InputField
        type={"email"}
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoFocus={true}
      />
      <div className="w-full flex flex-col gap-2">
        <PasswordField
          placeholder={"Password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Link to={"/forgot-password"} className="">
          <span className="text-blue-600">Forgot password?</span>
        </Link>
      </div>
      <Button
        type={"submit"}
        color={"text-white"}
        bgColor={"bg-blue-600"}
        onHover={"bg-blue-700"}
      >
        Login
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
