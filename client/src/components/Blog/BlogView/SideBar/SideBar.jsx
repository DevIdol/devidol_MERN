import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { debounce } from "../../../../utilities/helpers";
import styles from "./SideBar.module.css";
import SideBarNav from "./SideBarNav";

const SideBar = () => {
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

  return (
    <div className={styles.sideBar} style={{ top: visible ? "68px" : "-1px" }}>
      <Container>
        <SideBarNav />
      </Container>
    </div>
  );
};

export default SideBar;
