import { useState, Fragment } from "react";
import { Container } from "react-bootstrap";
import Button from "../../../../Screen/Button";
import All from "./LatestBlog/All";
import Installation from "./LatestBlog/Installation&Tool";
import Software from "./LatestBlog/Software";
import Tech from "./LatestBlog/Tech";
import styles from "./SideBarNav.module.css";

const SideBarNav = () => {
  const [isActive, setIsActive] = useState("all");
  const [blogs, setBlogs] = useState(<All />);
  return (
    <Fragment>
      <div className={styles.sideBarNav}>
        <Container>
          <Button
            className={
              isActive === "all"
                ? `${styles.item} ${styles.active}`
                : styles.item
            }
            onClick={() => {
              setBlogs(<All />);
              setIsActive("all");
            }}
          >
            All
          </Button>
          <Button
            className={
              isActive === "tech"
                ? `${styles.item} ${styles.active}`
                : styles.item
            }
            onClick={() => {
              setBlogs(<Tech />);
              setIsActive("tech");
            }}
          >
            Tech
          </Button>
          <Button
            className={
              isActive === "installation"
                ? `${styles.item} ${styles.active}`
                : styles.item
            }
            onClick={() => {
              setBlogs(<Installation />);
              setIsActive("installation");
            }}
          >
            Installation&Tool
          </Button>
          <Button
            className={
              isActive === "software"
                ? `${styles.item} ${styles.active}`
                : styles.item
            }
            onClick={() => {
              setBlogs(<Software />);
              setIsActive("software");
            }}
          >
            Software
          </Button>
        </Container>
      </div>

      {blogs}
    </Fragment>
  );
};

export default SideBarNav;
