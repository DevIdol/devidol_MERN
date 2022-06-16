import { Fragment } from "react";
import { Col, Card } from "react-bootstrap";
import styles from "./CardBlog.module.css";
import { Link } from "react-router-dom";
import NotFound from "../../../../../NotFound/NotFount";

const CardBlog = ({ blogs, path }) => {
  const PF = "https://devhub-mm.herokuapp.com/images/";
  let query = "";
  const result = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <Fragment>
      {blogs && result.length !== 0 ? (
        blogs.map((blog) => (
          <Col key={blog._id} md={12}>
            <Card className={styles.card}>
              {blog.photo && (
                <Card.Img src={PF + blog.photo} className={styles.img} />
              )}
              <Card.Body>
                <Card.Subtitle className={styles.subTitle}>
                  <div className={styles.divider}></div>
                  <p className={styles.cat}>{blog.cat}</p>
                </Card.Subtitle>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to={`${path}/${blog._id}`}
                >
                  <Card.Title className={styles.title}>{blog.title}</Card.Title>
                </Link>
                <Card.Subtitle className={styles.date}>
                  | Updated On {new Date(blog.createdAt).toDateString()}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <NotFound type="The result not found!" />
      )}
    </Fragment>
  );
};

export default CardBlog;
