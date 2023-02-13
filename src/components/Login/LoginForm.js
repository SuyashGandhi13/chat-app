import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import classes from "./LoginForm.module.css";
import useInput from "../../hooks/use-input";

const LoginForm = () => {
  const auth = getAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  let title = isLogin ? "Login" : "Register";
  let buttonText = isLogin ? "Login" : "Register";
  let text = isLogin ? "New user?Register" : "Already a user?Login";

  const setFormHandler = () => {
    setError("");
    setIsLogin((login) => !login);
  };

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetpassword,
  } = useInput((value) => value.trim() !== "" && value.length > 6);

  let formIsValid = false;

  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmission = (event) => {
    event.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    console.log(enteredEmail);
    console.log(enteredPassword);
    resetEmail();
    resetpassword();

    if (!isLogin) {
      createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword).catch(
        (error) => {
          const errorCode = error.code;
          setError(errorCode);
        }
      );
    } else {
      signInWithEmailAndPassword(auth, enteredEmail, enteredPassword).catch(
        (error) => {
          const errorCode = error.code;
          setError(errorCode);
        }
      );
    }
  };

  return (
    <div className={classes.form}>
      <div className={classes.title}>{title}</div>
      <form onSubmit={formSubmission}>
        <div className={classes["input-field"]}>
          <label htmlFor="name">Username:</label>
          <input
            id="name"
            type="text"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <div className={classes.error}>Email is not valid!</div>
          )}
        </div>
        <div className={classes["input-field"]}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <div className={classes.error}>Password is not valid!</div>
          )}
        </div>
        <div className={classes.error}>{error}</div>
        <div className={classes.change} onClick={setFormHandler}>
          {text}
        </div>
        <button
          type="submit"
          className={classes.button}
          disabled={!formIsValid}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
