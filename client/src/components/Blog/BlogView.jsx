import BlogViewPost from "./BlogView/BlogViewPost";
import styles from "./BlogView.module.css";
import SideBar from "./BlogView/SideBar/SideBar";
import useFetch from "../../Hooks/UseFetch";
import { Fragment, useEffect } from "react";
import Loading from "../../Loading/Loading";
import NotFound from "../../NotFound/NotFount";

const BlogView = () => {
  const { data, loading, error } = useFetch("/posts");
  useEffect(() => {
    document.title = "DevIdol | Blog View";
  }, []);
  return (
    <div className={styles.blogView}>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {error && (
            <p
              style={{
                color: "tomato",
                paddingTop: "140px",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              {error}
            </p>
          )}
          {data ? (
            <Fragment>
              <BlogViewPost />
              <SideBar />
            </Fragment>
          ) : (
            <NotFound type="Not Found!" />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default BlogView;
