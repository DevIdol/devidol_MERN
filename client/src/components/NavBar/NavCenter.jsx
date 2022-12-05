import styles from "./NavCenter.module.css";
import { navItems } from "./NavItems";
import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import ActiveLink from "../../ActiveLink/ActiveLink";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
const NavCenter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Fragment>
      <ul className={styles.navCenter}>
        {navItems.map((item) => (
          <ActiveLink
            onClick={() => window.scrollTo(0, 0)}
            key={item.id}
            className={styles.item}
            path={item.path}
            name={item.name}
          />
        ))}
        {user && (
          <ActiveLink
            onClick={() => window.scrollTo(0, 0)}
            className={styles.item}
            path="/admin/dashboard"
            name="Admin"
          />
        )}
      </ul>
      <Outlet />
    </Fragment>
  );
};

export default NavCenter;
