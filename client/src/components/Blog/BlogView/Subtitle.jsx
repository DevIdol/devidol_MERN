import { Delete, Edit } from "@material-ui/icons";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import styles from "./Subtitle.module.css";
import jwt from "jwt-decode";

const Subtitle = ({ cat, onDelete, userName, handleUpdate }) => {
  const { user } = useContext(AuthContext);
  const [decodedUser, setDecodedUser] = useState();
  useEffect(() => {
    try {
      const decoded = jwt(user);
      setDecodedUser(decoded);
    } catch (error) {}
  }, [user]);
  return (
    <Card.Subtitle className={styles.subTitle}>
      <div className={styles.left}>
        <div className={styles.divider}></div>
        <p className={styles.cat}>{cat}</p>
      </div>
      {(userName === decodedUser?.username || decodedUser?.isAdmin) && (
        <div className={styles.right}>
          <Tooltip title="Edit" placement="bottom-start">
            <Edit onClick={handleUpdate} className={styles.edit} />
          </Tooltip>
          <Tooltip title="Delete" placement="bottom-start">
            <Delete onClick={onDelete} className={styles.delete} />
          </Tooltip>
        </div>
      )}
    </Card.Subtitle>
  );
};

export default Subtitle;
