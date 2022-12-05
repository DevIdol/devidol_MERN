import React from "react";
import { Card } from "react-bootstrap";
import styles from "./SubTitle.module.css";

const SubTitle = ({ cat, date }) => {
  return (
    <Card.Subtitle className={styles.subTitle}>
      <div className={styles.subTitleLeft}>
        <div className={styles.underline}></div>
        <p>{cat}</p>
      </div>
      <p className={styles.date}> {date}</p>
    </Card.Subtitle>
  );
};

export default SubTitle;
