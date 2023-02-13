import Header from "./Header";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <Header loggedIn={props.loggedIn} auth={props.auth} />
      <div className={classes.layout}>{props.children}</div>
    </>
  );
};

export default Layout;
