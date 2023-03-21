import styler from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      className={`${styler.Button} ${props.className}`}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};
export default Button;
