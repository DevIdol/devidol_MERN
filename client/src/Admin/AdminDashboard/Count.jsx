import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { FaBlog, FaUser } from "react-icons/fa";
import { SiPolymerproject } from "react-icons/si";
import { BsEyeFill } from "react-icons/bs";
import Card from "../../Screen/Card";
import styles from "./Count.module.css";
import useFetch from "../../Hooks/UseFetch";
import { CounterContext } from "../../App";

const Count = ({ userCount }) => {
  const count = useContext(CounterContext);
  const { data } = useFetch("/posts");

  return (
    <Row className={styles.row}>
      <Col md={3}>
        <Card className={styles.card}>
          <FaUser className={styles.icon} />
          <div className={styles.rightSide}>
            <h3>Admin Count</h3>
            <Card className={styles.cardCount}>{userCount}</Card>
          </div>
        </Card>
      </Col>
      <Col md={3}>
        <Card className={styles.card}>
          <FaBlog className={styles.icon} />
          <div className={styles.rightSide}>
            <h3>Blog Count</h3>
            <Card className={styles.cardCount}>{data.length}</Card>
          </div>
        </Card>
      </Col>
      <Col md={3}>
        <Card className={styles.card}>
          <SiPolymerproject className={styles.icon} />
          <div className={styles.rightSide}>
            <h3>Project Count</h3>
            <Card className={styles.cardCount}>7</Card>
          </div>
        </Card>
      </Col>
      <Col md={3}>
        <Card className={styles.card}>
          <BsEyeFill className={styles.icon} />
          <div className={styles.rightSide}>
            <h3>Visit Count</h3>
            <Card className={styles.cardCount}>{count}</Card>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Count;
