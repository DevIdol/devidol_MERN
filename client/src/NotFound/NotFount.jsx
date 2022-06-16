import styles from "./NotFound.module.css";

const NotFound = ({ type }) => {
  return (
    <div className={styles.notFound}>
      <p>404</p>
      <div className={styles.divider}></div>
      <p>{type}</p>
    </div>
  );
};

export default NotFound;
