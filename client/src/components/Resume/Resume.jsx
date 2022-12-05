import React, { Fragment, useEffect } from "react";
import Footer from "../Footer/Footer";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Technical from "./Technical/Technical";

const Home = () => {
  useEffect(() => {
    document.title = "DevIdol | Resume";
  }, []);
  return (
    <Fragment>
      <About />
      <Technical />
      <Contact />
      <Footer/>
    </Fragment>
  );
};

export default Home;
