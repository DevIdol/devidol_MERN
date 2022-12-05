import React, { Fragment } from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotFound from "../../../../NotFound/NotFount";
import styles from "./CardBlog.module.css";
import SubTitle from "./SubTitle";

const CardBlog = ({ blogs, path }) => {
  const PF = "https://devhub-mm.herokuapp.com/images/";
  let query = "";
  const result = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <Fragment>
      {result.length !== 0 ? (
        blogs.map((blog) => (
          <Col key={blog._id} lg={4} md={6}>
            <Card className={styles.card}>
              {blog.photo && (
                <Card.Img
                  className={styles.img}
                  variant="top"
                  src={PF + blog.photo}
                />
              )}
              <Card.Body>
                <SubTitle
                  cat={blog.cat}
                  date={new Date(blog.createdAt).toDateString()}
                />
                <Link to={`${path}/${blog._id}`}>
                  <Card.Title className={styles.title}>{blog.title}</Card.Title>
                </Link>
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
