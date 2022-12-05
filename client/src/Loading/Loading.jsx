import { useContext } from "react";
import ReactLoading from "react-loading";
import { ThemeContext } from "../Context/ThemeContext/ThemeContext";
import './Loading.css'

const Loading = () => {
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  return (
    <div id="preloader">
      <ReactLoading
        className="preloaderIcon"
        type={"bubbles"}
        color={loadingColor}
        height={60}
        width={60}
      />
    </div>
  );
};

export default Loading;
