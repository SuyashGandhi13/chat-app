import { useState } from "react";

import classes from "./Send.module.css";

const Send = (props) => {
  const [text, setText] = useState("");

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const onSendHandler = () => {
    console.log(text);
    props.sendMessage(text);
    setText("");
  };

  return (
    <div className={classes.send}>
      <input
        placeholder="type here..."
        value={text}
        onChange={onChangeHandler}
      />
      <button onClick={onSendHandler}>Send</button>
    </div>
  );
};

export default Send;
