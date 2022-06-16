import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { debounce } from "../../../../utilities/helpers";
import styles from "./Categories.module.css";
const Categories = ({ catData }) => {
  const [isActive, setIsActive] = useState("all");
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
    isActive && window.scrollTo(0, 0);
  }, [isActive]);
  return (
    <div
      className={styles.categories}
      style={{ top: visible ? "64px" : "-80px" }}
    >
      <Container>
        <Link
          className={
            isActive === "all"
              ? `${styles.catLink} ${styles.active}`
              : styles.catLink
          }
          onClick={() => {
            setIsActive("all");
            window.scrollTo(0, 0);
          }}
          to=""
        >
          All
        </Link>
        {catData.map((cat, index) => {
          return (
            <Link
              key={index}
              onClick={() => {
                setIsActive(cat);
                window.scrollTo(0, 0);
              }}
              className={
                isActive === cat
                  ? `${styles.catLink} ${styles.active}`
                  : styles.catLink
              }
              to={`?category=${cat.toLowerCase()}`}
            >
              {cat}
            </Link>
          );
        })}
      </Container>
    </div>
  );
};

export default Categories;
