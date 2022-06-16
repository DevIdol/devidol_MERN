import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Input from "../../../Screen/Input";
import Button from "../../../Screen/Button";
import styles from "./ContactForm.module.css";
import { Spinner } from "react-bootstrap";
const ContactForm = () => {
  const [successAlt, setSuccessAlt] = useState(undefined);
  const [errorAlt, setErrorAlt] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleForm = useRef();
  const onSubmitEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_qc9qyid",
        "template_u1hmpi5",
        handleForm.current,
        "xb9SX1IiNXCEYTS3c"
      )
      .then(
        (result) => {
          result && setSuccessAlt(true);
          result && setLoading(false);
          result &&
            setTimeout(() => {
              setSuccessAlt(false);
            }, 3200);
        },
        (error) => {
          error && setErrorAlt(true);
          error && setLoading(false);
          error &&
            setTimeout(() => {
              setErrorAlt(false);
            }, 3200);
        }
      );
    e.target.reset();
  };

  return (
    <div className={styles["contact-form"]}>
      <form className={styles.form} ref={handleForm} onSubmit={onSubmitEmail}>
        {successAlt && (
          <p style={{ color: "teal", fontSize: "16px" }}>Success!</p>
        )}
        {errorAlt && (
          <p style={{ color: "tomato", fontSize: "16px" }}>
            Internet Connection Fail!
          </p>
        )}

        <Input
          className={styles["input-form"]}
          type="text"
          name="name"
          placeholder="Enter Your Name"
        />
        <Input
          className={styles["input-form"]}
          type="email"
          name="email"
          placeholder="Enter Your Email"
        />
        <textarea
          className={styles.textarea}
          name="message"
          placeholder="Enter Your Message"
          rows="6"
          required
        />
        <Button className={styles.button} type="submit">
          {loading ? <Spinner animation="border" /> : "Send Mail"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
