import PropTypes from "prop-types";
import Button from "../common/Button";
import InputField from "../common/InputField";

const ForgotPasswordForm = (props) => {
  const { email, loading, setEmail, handleForgotPassword } = props;
  return (
    <form
      className="w-3/5 flex flex-col gap-6 items-center"
      onSubmit={handleForgotPassword}
      method="post"
    >
      <InputField
        type={"email"}
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoFocus={true}
      />
      <Button
        type={"submit"}
        disabled={loading}
        color={"text-white"}
        bgColor={"bg-blue-600"}
        onHover={"bg-blue-700"}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  setEmail: PropTypes.func.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
