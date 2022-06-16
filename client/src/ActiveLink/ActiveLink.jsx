import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext/ThemeContext";

const ActiveLink = ({ path, name, className, type, onClick }) => {
  const [{ theme }] = useContext(ThemeContext);
  const location = useLocation();
  const activeColor = theme === "light" ? "#db084e" : "#65fcdb";
  const style = {
    color: location.pathname === path && activeColor,
    fontWeight: location.pathname === path && "bold",
    borderBottom:
      location.pathname === path && type && `2px solid ${activeColor}`,
  };

  return (
    <Link onClick={onClick} style={style} to={path} className={className}>
      {name}
    </Link>
  );
};

export default ActiveLink;
