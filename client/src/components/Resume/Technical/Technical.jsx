import React from "react";
import { RiMedalFill } from "react-icons/ri";
import Title from "../../../Screen/Title"
import styles from "./Technical.module.css";
import TechnicalButton from "./TechnicalButton";

const Technical = () => {
  return (
    <section className={styles["technical-section"]}>
     <div className={styles["technical-title"]}>
     <Title
        title="My Skills"
        icon={<RiMedalFill className={styles.icon} />}
        className={styles.underline}
      />
     </div>
      <TechnicalButton />
    </section>
  );
};

export default Technical;
