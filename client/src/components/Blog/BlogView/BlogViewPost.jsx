import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BlogViewPost.module.css";
import Loading from "../../../Loading/Loading";
import { Telegram, Facebook, Twitter } from "react-social-sharing";
import Subtitle from "./Subtitle";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import jwt from "jwt-decode";
import EditBlog from "./EditBlog";
import { useConfirm } from "material-ui-confirm";
import { axiosInstance } from "../../../config";
const BlogViewPost = () => {
  const confirm = useConfirm();
  const PF = "https://devhub-mm.herokuapp.com/images/";
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [decodedUser, setDecodedUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [updateBlog, setUpdateBlog] = useState(false);
  const location = useLocation();
  const pathType = location.pathname.split("/")[2];
  const pathID = location.pathname.split("/")[3];
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    document.title = `DevIdol | BlogView`;
    setLoading(true);
    try {
      const getPosts = async () => {
        const { data: res } = await axiosInstance.get(`/posts/${pathID}`);
        setTitle(res.data.title);
        setCat(res.data.cat);
        setDesc(res.data.desc);
        setPost(res.data);
        setLoading(false);
      };
      getPosts();
      const decoded = jwt(user);
      setDecodedUser(decoded);
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
        setLoading(false);
      }
    }
  }, [pathID, user]);

  const handleDesc = (e, editor) => {
    const data = editor.getData();
    setDesc(data);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (decodedUser.isAdmin || decodedUser.username) {
        await axiosInstance.put(`/posts/${post._id}`, {
          username: decodedUser.username,
          title,
          desc,
        });
      } else {
        setError("Something Wrong!");
      }
      setLoading(false);
      setUpdateBlog(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 100000);
        setLoading(false);
      }
    }
  };

  const onDelete = (id, photo, title) => {
    confirm({ description: `This will permanently delete ${title}.` })
      .then(() => {
        if (decodedUser.isAdmin || decodedUser.username) {
          if (photo === undefined || photo === null) {
            axiosInstance.delete(`/posts/${id}`);
          } else {
            axiosInstance.delete(`/posts/${id}/${photo}`);
          }
          navigate(-1);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    !updateBlog && window.scrollTo(0, 0);
    const identifier = setTimeout(() => {
      setFormIsValid(
        title.length > 2 && cat.length > 1 && cat.length < 22 && desc.length > 5
      );
    }, 1000);

    return () => clearTimeout(identifier);
  }, [title, cat, desc, updateBlog]);
  return (
    <div className={styles.blogViewPost}>
      <Container>
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
        {updateBlog ? (
          <Fragment>
            <EditBlog
              error={error}
              onBack={() => setUpdateBlog(false)}
              title={title}
              onChangeTitle={(e) => setTitle(e.target.value)}
              cat={cat}
              onChangeCat={(e) => setCat(e.target.value)}
              desc={desc}
              onChangeDesc={handleDesc}
              disabled={!formIsValid}
              loading={loading}
              handleUpdate={handleUpdate}
            />
          </Fragment>
        ) : (
          <Fragment>
            {loading ? (
              <Loading />
            ) : (
              <Fragment>
                <Card className={styles.card}>
                  <Card.Body>
                    <Subtitle
                      cat={cat}
                      handleUpdate={() => setUpdateBlog(true)}
                      onDelete={() =>
                        onDelete(post._id, post.photo, post.title)
                      }
                      userName={post.username}
                    />
                    <Card.Subtitle className={styles.date}>
                      | Updated On {new Date(post.createdAt).toDateString()}
                    </Card.Subtitle>

                    <Card.Title className={styles.title}> {title}</Card.Title>
                    {post.photo && (
                      <Card.Img
                        className={styles.img}
                        variant="top"
                        src={PF + post.photo}
                      />
                    )}
                    <Card.Text
                      className="description"
                      dangerouslySetInnerHTML={{ __html: desc }}
                    ></Card.Text>
                  </Card.Body>
                </Card>
                <div className={styles.shareBtn}>
                  <Facebook
                    solid
                    small
                    link={`https://devidol.herokuapp.com/blogs/${pathType}/${pathID}`}
                  />
                  <Telegram
                    solid
                    small
                    message={post.title}
                    link={`https://devidol.herokuapp.com/blogs/${pathType}/${pathID}`}
                  />
                  <Twitter
                    solid
                    small
                    message={post.title}
                    link={`https://devidol.herokuapp.com/blogs/${pathType}/${pathID}`}
                  />
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
      </Container>
    </div>
  );
};

export default BlogViewPost;
