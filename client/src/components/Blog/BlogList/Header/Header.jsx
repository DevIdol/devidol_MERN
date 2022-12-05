import { NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { ThemeContext } from "../../../../Context/ThemeContext/ThemeContext";
import { useContext, useState } from "react";
import SearchBar from "material-ui-search-bar";

const Header = ({ blogType, value, onChange, onCancelSearch }) => {
  const [show, setShow] = useState(false);
  const [{ theme }] = useContext(ThemeContext);
  const location = useLocation();
  const activeColor = theme === "light" ? "#db084e" : "#65fcdb";

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <NavDropdown
          show={show}
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
          id="nav-dropdown-dark-example"
          title="Blog Detail"
        >
          <NavDropdown.Item
            style={{
              color: location.pathname === "/blogs/tech" && activeColor,
            }}
            as={Link}
            to="/blogs/tech"
            onClick={() => {
              window.scrollTo(0, 0);
              setShow(false);
              document.title = "DevHub | Tech";
            }}
          >
            Tech
          </NavDropdown.Item>
          <NavDropdown.Item
            style={{
              color:
                location.pathname === "/blogs/installations&tools" &&
                activeColor,
            }}
            as={Link}
            to="/blogs/installations&tools"
            onClick={() => {
              window.scrollTo(0, 0);
              setShow(false);
              document.title = "DevHub | Installation&Tool";
            }}
          >
            Installation&Tool
          </NavDropdown.Item>
          <NavDropdown.Item
            style={{
              color: location.pathname === "/blogs/softwares" && activeColor,
            }}
            as={Link}
            to="/blogs/softwares"
            onClick={() => {
              window.scrollTo(0, 0);
              setShow(false);
              document.title = "DevHub | Software";
            }}
          >
            Software
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            style={{
              color: location.pathname === "/blogs/all" && activeColor,
            }}
            as={Link}
            to="/blogs/all"
            onClick={() => {
              window.scrollTo(0, 0);
              setShow(false);
              document.title = "DevHub | All Blogs";
            }}
          >
            All
          </NavDropdown.Item>
        </NavDropdown>
        <p>{blogType}</p>
      </div>

      <SearchBar
        className={styles.search}
        value={value}
        onChange={onChange}
        onCancelSearch={onCancelSearch}
      />
    </div>
  );
};

export default Header;
