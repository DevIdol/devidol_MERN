import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Screen/Button";
import classes from "./EmailVerify.module.css";
import success from "../assets/success.png";
import { axiosInstance } from "../config";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFount";
const EmailVerify = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const param = useParams();
  useEffect(() => {
    setLoading(true);
    const verifyEmailUrl = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/users/${param.id}/verify/${param.token}`
        );

        setMsg(data.message);
        setLoading(false);
        setError("");
        setMsg(data.message);
        !msg && navigate("/admin-login");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setLoading(false);
          setError(error.response.data.message);
          setMsg("");
        }
      }
    };
    verifyEmailUrl();
  }, [param, navigate, msg]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {
            <div className={classes.container}>
              <img
                src={success}
                alt="success_img"
                className={classes.successImg}
              />
              <h1>{msg}</h1>

              <Button
                onClick={() => navigate("/admin-login")}
                className={classes.loginLink}
                type="text"
              >
                Login
              </Button>
            </div>
          }
          {error && <NotFound type={error} />}
        </Fragment>
      )}
    </Fragment>
  );
};

export default EmailVerify;
