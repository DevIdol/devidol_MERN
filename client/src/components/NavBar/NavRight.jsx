import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import styles from "./NavRight.module.css";
import { GitHubPage, SendMail } from "../Icon/Icon";

const NavRight = () => {
  const [{ theme }, toggleTheme] = useContext(ThemeContext);
  const themeMode =
    theme === "light" ? (
      <DarkModeIcon className={styles.dark}  />
    ) : (
      <LightModeIcon className={styles.light}  />
    );

  return (
    <div className={styles.navRight}>
      <SendMail className={styles.mail}/>
      <GitHubPage className={styles.github} />
      <div onClick={toggleTheme}>{themeMode}</div>
    </div>
  );
};

export default NavRight;
