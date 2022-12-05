import React from "react";
import { Spinner } from "react-bootstrap";
import CKTextEditor from "../../../Admin/TextEditor/CKTextEditor";
import Button from "../../../Screen/Button";
import styles from "./EditBlog.module.css";
import { ArrowBack } from "@material-ui/icons";

const EditBlog = ({
  error,
  onBack,
  title,
  onChangeTitle,
  cat,
  onChangeCat,
  desc,
  onChangeDesc,
  disabled,
  loading,
  handleUpdate,
}) => {
  return (
    <div className={styles.editBlog}>
      <p
        onClick={onBack}
        style={{ color: "teal", fontWeight: "bold", cursor: "pointer" }}
      >
        <span>
          <ArrowBack />
        </span>
        Back
      </p>
      <div className={styles.adminBlogFormGroup}>
        <input
          type="text"
          placeholder="Category...(maxlength 22)"
          value={cat}
          className={`${styles.blogInput} ${styles.blogCat}`}
          onChange={onChangeCat}
          required
        />
      </div>
      <div className={styles.adminBlogFormGroup}>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          className={styles.blogInput}
          onChange={onChangeTitle}
          autoFocus={true}
          required
        />
      </div>

      <CKTextEditor desc={desc} onChange={onChangeDesc} />
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
      <Button
        onClick={handleUpdate}
        type="submit"
        className={styles.blogUpdate}
        disabled={disabled}
      >
        {loading ? <Spinner animation="border" /> : "Update"}
      </Button>
    </div>
  );
};

export default EditBlog;
