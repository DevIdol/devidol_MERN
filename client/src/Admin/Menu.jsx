import React from "react";
import { FaBars } from "react-icons/fa";
import styles from "./Menu.module.css";

const Menu = ({ toggleMenu, isOpen, style }) => {
  return (
    <div
      className={isOpen ? `${styles.toggle} ${styles.active}` : styles.toggle}
      onClick={toggleMenu}
      style={style}
    >
      <FaBars className={styles.openMenu} />
    </div>
  );
};

export default Menu;
