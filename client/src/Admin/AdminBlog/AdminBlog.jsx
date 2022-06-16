import React, { useEffect, useState, useContext } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Button from "../../Screen/Button";
import { Spinner } from "react-bootstrap";
import styles from "./AdminBlog.module.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import CKTextEditor from "../TextEditor/CKTextEditor";
import { axiosInstance } from "../../config";
import { debounce } from "../../utilities/helpers";

const AdminBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const decodedUser = jwt(user);
  const [type, setType] = useState();
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 30) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const handleDesc = (e, editor) => {
    const data = editor.getData();
    setDesc(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPost = {
      username: decodedUser.username,
      title,
      type,
      cat,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + "--" + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {
        setError("Internal Server Error");
      }
    }
    try {
      const { data: res } = await axiosInstance.post("/posts", newPost);
      navigate(`/blogs/all/${res.data._id}`);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    }
    setLoading(false);
    setDesc("");
    setType("");
    e.target.reset();
  };
  useEffect(
    () => {
      const identifier = setTimeout(() => {
        setFormIsValid(
          title.length > 2 &&
            cat.length > 1 &&
            cat.length < 22 &&
            desc.length > 5 &&
            (type.includes("Tech") ||
              type.includes("Installation & Tool") ||
              type.includes("Software"))
        );
      }, 1000);

      return () => clearTimeout(identifier);
    },
    [title, cat, desc, type],
    []
  );
  return (
    <div className={styles.adminBlogSection}>
      <div className={styles.title} style={{ top: visible ? "70px" : "-80px" }}>
        <h1>Blog</h1>
      </div>

      <div className={styles.adminBlogImg}>
        {file && <img src={URL.createObjectURL(file)} alt="blogImg" />}
      </div>
      <div className={styles.adminBlog}>
        <form className={styles.adminBlogForm} onSubmit={handleSubmit}>
          <div className={styles.adminBlogFormGroup}>
            <label htmlFor="fileInput">
              <MdAddCircleOutline className={styles.adminBlogIcon} />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={styles.select}
            >
              <option>Select...</option>
              <option>Tech</option>
              <option>Installation & Tool</option>
              <option>Software</option>
            </select>
          </div>
          <div className={styles.adminBlogFormGroup}>
            <input
              type="text"
              placeholder="Category...(maxlength 22)"
              className={`${styles.blogInput} ${styles.blogCat}`}
              onChange={(e) => setCat(e.target.value)}
              required
            />
          </div>
          <div className={styles.adminBlogFormGroup}>
            <input
              type="text"
              placeholder="Title..."
              className={styles.blogInput}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <CKTextEditor desc={desc} onChange={handleDesc} />
          {error && (
            <p
              style={{
                fontSize: "20px",
                color: "tomato",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            className={styles.blogSubmit}
            disabled={!formIsValid}
          >
            {loading ? <Spinner animation="border" /> : "Publish"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminBlog;
