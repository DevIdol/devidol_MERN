import React, { useState } from "react";
import Input from "../../../Screen/Input";
import Button from "../../../Screen/Button";
import styles from "./ContactForm.module.css";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { SendMessage } from "./SendMessage";
const ContactForm = () => {
  const [, setSend] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        name.length > 2 && email.includes("@") && message.length > 6
      );
    }, 1000);

    return () => clearTimeout(identifier);
  }, [name, email, message]);

  const onSubmitEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formIsValid) {
      SendMessage({ name, email, message, setSend })
        .then(() => {
          setLoading(false)
          toast.success(`Your message sent successfully.`, {
            position: "bottom-left",
            autoClose: 2000,
          });
          setName("");
          setEmail("");
          setMessage("");
          setSend();
        })
        .catch((error) => {
          setLoading(false);
          toast.error(`Internet connection failed!.`, {
            position: "bottom-left",
            autoClose: 2000,
          });
          setName("");
          setEmail("");
          setMessage("");
          setSend();
        });
    }
  };

  return (
    <div className={styles["contact-form"]}>
      <form className={styles.form} onSubmit={onSubmitEmail}>
        <Input
          className={styles["input-form"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Your Name"
          required
        />
        <Input
          className={styles["input-form"]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="How can I help you?"
          rows={4}
          required
        />
        <Button className={styles.button} type="submit" disabled={!formIsValid}>
          {loading ? <Spinner animation="border" /> : "Send Mail"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
