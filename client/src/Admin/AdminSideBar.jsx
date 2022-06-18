import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Menu from "./Menu";
import { adminSideBarItem } from "./AdminSideBarItem";
import styles from "./AdminSideBar.module.css";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { ThemeContext } from "../Context/ThemeContext/ThemeContext";
import jwt from "jwt-decode";
import { useConfirm } from "material-ui-confirm";
import { debounce } from "../utilities/helpers";
const AdminSideBar = () => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const PFURL = "https://devidol.herokuapp.com/images/";
  const { user, dispatch } = useContext(AuthContext);
  const decodedUser = jwt(user);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const [{ theme }] = useContext(ThemeContext);
  const activeColor = theme === "dark" ? "#65fcdb" : "#db084e";
  const activeBackground =
    theme === "dark" ? "rgba(0,0,0,0)" : "rgba(224, 217, 217, 0.5)";
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 30) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const handleLogout = () => {
    confirm({ title: "Are you sure to Logout?" })
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      {user && (
        <Fragment>
          {isOpen && (
            <div onClick={closeMenu} className={styles.overflow}></div>
          )}
          <Menu
            toggleMenu={toggleMenu}
            isOpen={isOpen}
            style={{ display: visible ? "block" : "none" }}
          />
          <div
            className={
              isOpen
                ? `${styles.adminSideBar} ${styles.active}`
                : styles.adminSideBar
            }
            style={{ top: visible ? "70px" : 0 }}
          >
            <Link to="/admin/account" className={styles.adminSideBarHeader}>
              <div className={styles.adminSideBarHeaderTop}>
                <img
                  src={
                    decodedUser.profile
                      ? PFURL + decodedUser.profile
                      : PFURL + "profile.png"
                  }
                  className={styles.me}
                  alt=""
                />
                <h6 className={styles.adminName}>{decodedUser.username}</h6>
              </div>
              <p className={styles.adminMail}>{decodedUser.email}</p>
            </Link>

            {adminSideBarItem.map((item) => (
              <NavLink
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive && 800,
                    color: isActive && activeColor,
                    backgroundColor: isActive && activeBackground,
                    width: isActive && 200,
                    borderRadius: isActive && 10,
                  };
                }}
                onClick={closeMenu}
                to={item.link}
                className={styles.item}
                key={item.id}
              >
                <span className={styles.adminSideBarIcon}>{item.icon}</span>{" "}
                {item.name}
              </NavLink>
            ))}
            <p onClick={handleLogout} className={styles.item}>
              <span className={styles.adminSideBarIcon}>
                <FiLogOut />
              </span>{" "}
              Logout
            </p>
          </div>
          <Outlet />
        </Fragment>
      )}
    </Fragment>
  );
};

export default AdminSideBar;
