import React, { Fragment, useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Button from "../../Screen/Button";
import styles from "./BlogTable.module.css";
import ReactLoading from "react-loading";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import jwt from "jwt-decode";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../../config";
const BlogTable = ({ itemsPerPage }) => {
  const confirm = useConfirm();
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  const { user } = useContext(AuthContext);
  const decodedUser = jwt(user);
  let [searchParams] = useSearchParams();
  const [loadmore, setLoadmore] = useState(4);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: res } = await axiosInstance.get("/posts");
        setBlogs(res.data);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const reverseBlogs = blogs
    .slice(0)
    .reverse()
    .filter((blog) => {
      let category = searchParams.get("category");
      if (!category) return true;
      let cat = blog.cat.toLowerCase();
      return cat.startsWith(category.toLowerCase());
    });
  const sliceBlogs = reverseBlogs.slice(0, loadmore);
  const onLoadmore = () => {
    setLoadmore((preValue) => preValue + 2);
  };
  const onLoadBack = () => {
    setLoadmore((preValue) => preValue - 2);
  };
  const isLoadmore = reverseBlogs.length > loadmore;
  const isLoadBack = loadmore > 4;

  const onDelete = (id, photo, title) => {
    confirm({ description: `This will permanently delete ${title}.` })
      .then(() => {
        const newBlogs = blogs.filter((blog) => blog._id !== id);
        if (decodedUser.isAdmin || decodedUser.username) {
          if (photo === undefined || photo === null) {
            axiosInstance.delete(`/posts/${id}`);
          } else {
            axiosInstance.delete(`/posts/${id}/${photo}`);
          }
          setMessage("Post has been deleted!");

          setBlogs(newBlogs);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        } else {
          setErr("Admin only can delete!");
          setTimeout(() => {
            setErr("");
          }, 4000);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <Fragment>
      {loading ? (
        <div className={styles.preloader}>
          <ReactLoading
            className="preloaderIcon"
            type={"bubbles"}
            color={loadingColor}
            height={50}
            width={50}
          />
        </div>
      ) : (
        <Fragment>
          {message && (
            <p
              style={{
                fontSize: "14px",
                color: "teal",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}
          {err && (
            <p
              style={{
                fontSize: "14px",
                color: "tomato",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {err}
            </p>
          )}
          <div className={styles.table}>
            {error && (
              <p
                style={{
                  fontSize: "14px",
                  color: "tomato",
                  paddingTop: "20px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}
            {!error && sliceBlogs && (
              <Table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {sliceBlogs &&
                    sliceBlogs.map((blog, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{blog.username}</td>
                          <td>{blog.title}</td>
                          <td>{blog.cat}</td>
                          <td>{new Date(blog.createdAt).toDateString()}</td>
                          <td>
                            <Button
                              onClick={() => navigate(`/blogs/all/${blog._id}`)}
                              disabled={
                                !(
                                  decodedUser.username === blog.username ||
                                  decodedUser.isAdmin
                                ) && true
                              }
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() =>
                                onDelete(blog._id, blog.photo, blog.title)
                              }
                              disabled={
                                !(
                                  decodedUser.username === blog.username ||
                                  decodedUser.isAdmin
                                ) && true
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            )}
          </div>

          <div className={styles.load}>
            {isLoadBack && (
              <Button
                type="button"
                onClick={onLoadBack}
                className={styles.loadBtn}
              >
                Load Back
              </Button>
            )}
            <div />
            {isLoadmore && (
              <Button
                type="button"
                onClick={onLoadmore}
                className={styles.loadBtn}
              >
                Load More
              </Button>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BlogTable;
