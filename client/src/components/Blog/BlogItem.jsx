import { postItems } from "./PostItems";
import ActiveLink from "../../ActiveLink/ActiveLink";
import styles from "./BlogItem.module.css";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const BlogItem = () => {
  return (
    <Fragment>
      <div className={styles.blogItem}>
        {postItems.map((item) => (
          <ActiveLink
            key={item.id}
            path={item.path}
            name={item.name}
            className={styles.item}
            type={true}
          />
        ))}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default BlogItem;
