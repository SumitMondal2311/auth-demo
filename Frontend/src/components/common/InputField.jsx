import propTypes from "prop-types";

const InputField = (props) => {
  const { type, placeholder, onChange, value, autoFocus } = props;

  return (
    <input
    className="w-full px-4 py-2"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      autoFocus={autoFocus}
    />
  );
};

InputField.propTypes = {
  type: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  autoFocus: propTypes.bool,
};

InputField.default = {
  autofocus: false,
};

export default InputField;
