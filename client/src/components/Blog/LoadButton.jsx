import React from "react";
import Button from "../../Screen/Button";
import styles from "./LoadButton.module.css";

const LoadButton = ({
  isLoadBack,
  onLoadBack,
  isLoadmore,
  onLoadmore,
}) => {
  return (
    <div className={styles.load}>
      { isLoadBack && (
        <Button type="button" onClick={onLoadBack} className={styles.loadBtn}>
          Load Back
        </Button>
      )}

      {isLoadmore && (
        <Button type="button" onClick={onLoadmore} className={styles.loadBtn}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default LoadButton;
