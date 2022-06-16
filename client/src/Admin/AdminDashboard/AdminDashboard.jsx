import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Count from "./Count";
import styles from "./AdminDashboard.module.css";
import UserTable from "./UserTable";
import BlogTable from "./BlogTable";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/UseFetch";
import { debounce } from "../../utilities/helpers";
import Button from "../../Screen/Button";
import jwt from "jwt-decode";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
const AdminDashboard = () => {
  const { user, dispatch } = useContext(AuthContext);
  const decodedUser = jwt(user);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/users`);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 30) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    loading === false &&
      error &&
      dispatch({ type: "LOGOUT" }) &&
      navigate("/admin-login");
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    prevScrollPos,
    visible,
    handleScroll,
    loading,
    error,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    document.title = "DevIdol | Admin";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.adminDashboard}>
      <div className={styles.title} style={{ top: visible ? "70px" : "-80px" }}>
        <h1>Dashboard</h1>
      </div>
      <Container className={styles.container}>
        <Count userCount={data.length} />
      </Container>
      <div className={styles.userHeader}>
        <h5 className={styles.tableTitle}>User Table</h5>
        {data && (
          <Button
            className={styles.addNewUser}
            onClick={() => navigate("/admin/dashboard/add-new-user")}
            disabled={decodedUser.isAdmin ? false : true}
          >
            Add New User
          </Button>
        )}
      </div>
      <UserTable />
      <hr />
      <div className={styles.userHeader}>
        <h5 className={styles.tableTitle}>Blog Table</h5>
        <Link className={styles.addNewUser} to="/admin/blog">
          Add New Blog
        </Link>
      </div>
      <BlogTable />
    </div>
  );
};

export default AdminDashboard;
