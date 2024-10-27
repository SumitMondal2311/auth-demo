import PropTypes from "prop-types";
import { useState } from "react";
import hide from "../../assets/images/hide.png";
import show from "../../assets/images/show.png";

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { placeholder, onChange, value, autoFocus } = props;
  return (
    <div className="w-full relative flex items-center">
      <input
        className="w-full py-2 pl-4 pr-12"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoFocus={autoFocus}
      />
      <img
        className="h-6 absolute right-4 cursor-pointer"
        src={showPassword ? show : hide}
        onClick={() => setShowPassword((prev) => !prev)}
        alt="toggle-hide-show-password"
      />
    </div>
  );
};

PasswordField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
};

PasswordField.default = {
  autoFocus: false,
};

export default PasswordField;
