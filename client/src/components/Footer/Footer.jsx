import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import SocialMedia from "../Resume/About/SocialMedia";
import styles from "./Footer.module.css";

const Footer = ({ href }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-content"]}>
        <h6>Hey There, I Am</h6>
        <h5>Web And Mobile Application Developer</h5>
      </div>

      <div className={styles["footer-contact"]}>
        <SocialMedia />
      </div>
      <div className={styles.copyright}>
        <h5>
          <a
            rel="nofollow noopener noreferrer"
            href="https://www.facebook.com/profile.php?id=100026052723303"
            target="_blank"
          >
            Developed By Ha Shing Thang
          </a>
        </h5>
        <h6>Copyright &copy; 2021 - {new Date().getFullYear()}</h6>
      </div>
      <div
        className={styles["back-top"]}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        
          <FaArrowCircleUp className={styles.backTopIcon} size={30} />
       
      </div>
    </footer>
  );
};

export default Footer;
