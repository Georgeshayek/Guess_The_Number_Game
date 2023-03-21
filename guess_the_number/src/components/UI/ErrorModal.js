import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import styler from "./ErrorModal.module.css";
const ErrorModal = (props) => {
  const Backdrop = (props) => {
    return <div className={styler.backdrop} onClick={props.dismiss}></div>;
  };
  const Modal = (props) => {
    return (
      <Card className={styler.modal}>
        <header className={styler.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styler.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styler.actions}>
          <Button className={styler.Btn_Active} onClick={props.dismiss}>
            Okay
          </Button>
        </footer>
      </Card>
    );
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop dismiss={props.dismiss} />,
        document.getElementById("backdrop-root")
      )}

      {ReactDOM.createPortal(
        <Modal
          message={props.message}
          title={props.title}
          dismiss={props.dismiss}
        />,
        document.getElementById("modal-root")
      )}
    </Fragment>
  );
};
export default ErrorModal;
