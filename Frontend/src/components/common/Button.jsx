import PropTypes from "prop-types";

const Button = (props) => {
  const { children, type, onClick, disabled, color, bgColor, onHover } = props;

  return (
    <button
      className={`w-full ${color} ${bgColor} py-2 hover:${onHover}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  onHover: PropTypes.string,
};

Button.default = {
  disabled: false,
};

export default Button;
