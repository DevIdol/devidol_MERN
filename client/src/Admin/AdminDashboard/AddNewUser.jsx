import React, { useEffect, useState } from "react";
import { debounce } from "../../utilities/helpers";
import styles from "./AddNewUser.module.css";
import AddUserInput from "./AddUserInput";
const AddNewUser = () => {
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
  useEffect(() => {
    document.title = "DevIdol | Add New User";
  }, []);
  return (
    <div className={styles.adminDashboard}>
      <div className={styles.title} style={{ top: visible ? "80px" : "-80px" }}>
        <h1>Add New User</h1>
      </div>
      <AddUserInput />
    </div>
  );
};

export default AddNewUser;
