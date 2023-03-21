import styler from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={`${styler.Card} ${props.className}`}>{props.children}</div>
  );
};
export default Card;
