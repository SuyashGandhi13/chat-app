import { useState } from "react";

import classes from "./Message.module.css";

const Message = (props) => {
  const [hover, setHover] = useState(false);
  let loggedIn = props.loggedIn;

  let type = props.user === loggedIn ? "sent" : "received";

  function setHoverTrue() {
    setHover(true);
  }

  function setHoverFalse() {
    setHover(false);
  }

  let messageBody =
    props.user === loggedIn
      ? classes["message-body"]
      : `${classes["message-body"]} ${classes.sent}`;
  let user =
    props.user === loggedIn ? classes.user : `${classes.user} ${classes.sent}`;
  let typeStyle =
    props.user === loggedIn ? classes.type : `${classes.type} ${classes.sent}`;

  return (
    <div
      className={messageBody}
      onMouseEnter={setHoverTrue}
      onMouseLeave={setHoverFalse}
    >
      <div className={user}>{props.user}</div>
      <div className={classes.text}>{props.children}</div>
      <div className={typeStyle}>{hover ? type : ""}</div>
    </div>
  );
};

export default Message;
