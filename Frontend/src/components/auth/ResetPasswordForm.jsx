import Button from "../common/Button";
import PasswordField from "../common/PasswordField";
import PropTypes from "prop-types";

const ResetPasswordForm = (props) => {
  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handleResetPassword,
  } = props;

  return (
    <form
      className="w-3/5 flex flex-col gap-6 items-center"
      onSubmit={handleResetPassword}
      method="post"
    >
      <PasswordField
        placeholder={"New password"}
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
        autoFocus={true}
      />
      <PasswordField
        placeholder={"Confirm password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      <Button
        type={"submit"}
        color={"text-white"}
        bgColor={"bg-blue-600"}
        onHover={"bg-blue-700"}
      >
        Reset Password
      </Button>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  handleResetPassword: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
