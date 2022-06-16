import React from "react";
import { FaRegStar } from "react-icons/fa";
import Title from "../../../Screen/Title";
import styles from "./ContactTitle.module.css";
const ContactTitle = () => {
  return (
    <div className={`${styles["contact-title"]}`}>
      <Title
        title="Contact Me"
        icon={<FaRegStar className={styles.icon} />}
        className={styles.underline}
      />
    </div>
  );
};

export default ContactTitle;
