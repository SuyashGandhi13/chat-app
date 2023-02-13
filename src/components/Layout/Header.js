import classes from "./Header.module.css";

const Header = (props) => {
  const onClickLogout = () => {
    props.auth.signOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-nav"]}>
        <div className={classes.title}>ChatApp</div>
        {props.loggedIn && (
          <div className={classes.logout} onClick={onClickLogout}>
            Logout
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
