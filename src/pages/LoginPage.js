import LoginForm from "../components/Login/LoginForm";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={classes["login-page"]}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
