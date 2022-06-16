/* eslint-disable array-callback-return */
import SearchBar from "material-ui-search-bar";
import { Fragment, useState } from "react";
import { Row } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";
import LoadButton from "../../../LoadButton";
import CardBlog from "./CardBlog";
import styles from "./LatestBlog.module.css";
import useFetch from "../../../../../Hooks/UseFetch";
import Loading from "../../../../../Loading/Loading";
const All = () => {
  let [searchParams] = useSearchParams();
  const { search } = useLocation();
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetch(`/posts` + search);
  const [loadmore, setLoadmore] = useState(3);
  const searchQuery = data.filter((post) => {
    if (query === "") {
      return post;
    } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
  });

  const reverseBlogs = searchQuery
    .slice(0)
    .reverse()
    .filter((blog) => {
      let category = searchParams.get("category");
      if (!category) return true;
      let cat = blog.cat.toLowerCase();
      return cat.startsWith(category.toLowerCase());
    });

  const sliceBlogs = reverseBlogs.slice(0, loadmore);
  const onLoadmore = () => {
    setLoadmore((preValue) => preValue + 3);
  };
  const onLoadBack = () => {
    setLoadmore((preValue) => preValue - 3);
  };
  const isLoadmore = reverseBlogs.length > loadmore;
  const isLoadBack = loadmore > 3;
  return (
    <Fragment>
      <div className={styles.header}>
        <h4>Latest Blog</h4>
        <SearchBar
          className={styles.search}
          value={query}
          onChange={(value) => setQuery(value)}
          onCancelSearch={() => setQuery("")}
        />
      </div>
      <Row>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
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
            <CardBlog blogs={sliceBlogs} path="/blogs/all" />
            <LoadButton
              isLoadBack={isLoadBack}
              onLoadBack={onLoadBack}
              isLoadmore={isLoadmore}
              onLoadmore={onLoadmore}
            />
          </Fragment>
        )}
      </Row>
    </Fragment>
  );
};

export default All;
