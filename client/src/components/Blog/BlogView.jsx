import BlogViewPost from "./BlogView/BlogViewPost";
import styles from "./BlogView.module.css";
import SideBar from "./BlogView/SideBar/SideBar";
import { useEffect } from "react";

const BlogView = () => {
  useEffect(() => {
    document.title = "DevIdol | Blog View";
  }, []);
  return (
    <div className={styles.blogView}>
      <BlogViewPost />
      <SideBar />
    </div>
  );
};

export default BlogView;
