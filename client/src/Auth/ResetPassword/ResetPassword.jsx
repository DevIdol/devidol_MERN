import React, { useEffect, useState, Fragment } from "react";
import Card from "../../Screen/Card";
import Input from "../../Screen/Input";
import Button from "../../Screen/Button";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import { axiosInstance } from "../../config";
import Loading from "../../Loading/Loading";
const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = `/password-reset/${param.id}/${param.token}`;
  useEffect(() => {
    setLoading(true);
    const verifyUrl = async () => {
      try {
        await axiosInstance.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
    setLoading(false);
  }, [param, url]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(url, {
        password,
      });
      setMessage(data.message);
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 10000);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setLoading(false);
        setError(error.response.data.message);
        setMessage("");
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    }
    e.target.reset();
    setFormIsValid(false);
    setShowPass(false);
    setLoading(false);
  };

  const showPassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    document.title = "DevIdol | Reset Password";
    const identifier = setTimeout(() => {
      setFormIsValid(
        password.trim().length > 5 && password === confirmPassword
      );
    }, 1000);

    return () => clearTimeout(identifier);
  }, [password, confirmPassword]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {validUrl ? (
            <Card className={styles.resetPassCard}>
              <h5>Reset Password</h5>
              {message && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "teal",
                    paddingTop: "10px",
                  }}
                >
                  {message}
                </p>
              )}
              {error && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "tomato",
                    paddingTop: "10px",
                  }}
                >
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <label>Password</label>
                <Input
                  className={styles.input}
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirm Password</label>
                <Input
                  className={styles.input}
                  placeholder="Confirm Password"
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className={styles.showPass}>
                  <input className={styles.checkbox} onClick={showPassword} type="checkbox" />
                  <span>Show Password</span>
                </div>
                <Button className={styles.button} disabled={!formIsValid}>
                  {loading ? <Spinner animation="border" /> : "Submit"}
                </Button>
              </form>
              <div className={styles.resetPassFooter}>
                <Link className={styles.link} to="/">
                  Back To Home
                </Link>
                <span
                  className={styles.link}
                  onClick={() => navigate("/admin-login")}
                >
                  Go To Login
                </span>
              </div>
            </Card>
          ) : (
            <Fragment>
              {loading ? (
                <Loading />
              ) : (
                <h1 className="text-center" style={{ paddingTop: "140px" }}>
                  404 Not Found!!
                </h1>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
