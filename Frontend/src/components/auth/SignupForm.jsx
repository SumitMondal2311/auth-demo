import PropTypes from "prop-types";
import Button from "../common/Button";
import InputField from "../common/InputField";
import PasswordField from "../common/PasswordField";

const SignupForm = (props) => {
  const {
    firstName,
    lastName,
    email,
    password,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    handleSignup,
  } = props;

  return (
    <form
      className="w-1/2 flex flex-col gap-4 items-center"
      onSubmit={handleSignup}
      method="post"
    >
      <InputField
        type={"text"}
        placeholder={"FirstName"}
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        autoFocus={true}
      />
      <InputField
        type={"text"}
        placeholder="Lastname"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <InputField
        type={"email"}
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <PasswordField
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button
        type={"submit"}
        color={"text-white"}
        bgColor={"bg-blue-600"}
        onHover={"bg-blue-700"}
      >
        Signup
      </Button>
    </form>
  );
};

SignupForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired,
};

export default SignupForm;
