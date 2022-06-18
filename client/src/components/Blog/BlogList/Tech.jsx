/* eslint-disable array-callback-return */
import { Fragment, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./BlogList.module.css";
import CardBlog from "./Layout/CardBlog";
import Header from "./Header/Header";
import { useLocation, useSearchParams } from "react-router-dom";
import LoadButton from "../LoadButton";
import Categories from "./Category/Categories";
import useFetch from "../../../Hooks/UseFetch";
import Loading from "../../../Loading/Loading";
import NotFound from "../../../NotFound/NotFount";
import Footer from "../../Footer/Footer";

const Tech = () => {
  let [searchParams] = useSearchParams();
  const { search } = useLocation();
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetch(`/posts` + search);
  const [loadmore, setLoadmore] = useState(6);
  const newsFilter = data.filter((blog) => blog.type === "Tech");
  const arrCats = newsFilter.map((cat) => cat.cat);
  const catsSet = new Set(arrCats);
  const catData = [...catsSet];
  const searchQuery = newsFilter.filter((post) => {
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
    setLoadmore((preValue) => preValue + 6);
  };
  const onLoadBack = () => {
    setLoadmore((preValue) => preValue - 6);
  };
  const isLoadmore = reverseBlogs.length > loadmore;
  const isLoadBack = sliceBlogs.length > 6;
  useEffect(() => {
    document.title = "DevIdol | Tech";
  });
  return (
    <Fragment>
      <div className={styles.blogList}>
        <Categories catData={catData} />
        <Container>
          <Header
            blogType="Tech"
            value={query}
            onChange={(value) => setQuery(value)}
            onCancelSearch={() => setQuery("")}
          />
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
                {data ? (
                  <Fragment>
                    <CardBlog blogs={sliceBlogs} path="/blogs/tech" />
                    <LoadButton
                     
                      isLoadBack={isLoadBack}
                      onLoadBack={onLoadBack}
                      isLoadmore={isLoadmore}
                      onLoadmore={onLoadmore}
                    />
                  </Fragment>
                ) : (
                  <NotFound type="Not Found!" />
                )}
              </Fragment>
            )}
          </Row>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Tech;
