import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && inputTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setInputTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setInputTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
