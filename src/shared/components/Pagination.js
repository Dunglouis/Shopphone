import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
  const { total, totalPages, currentPage, next, prev, hasNext, hasPrev } =
    pages;

  const [searchParams, setSearchParams] = useSearchParams();

  const formatUrl = (page) => {
    return `/search?keyword=${searchParams.get("keyword")}&page=${page}`;
  };

  const onclickPage = (e, page) => {
    if (page === "...") return e.preventDefault();
  };

  const renderPagesHtml = (delta = 1) => {
    const pagesHtml = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        pagesHtml.push(i);
      } else if (i === left - 1 || i === right + 1) {
        pagesHtml.push("...");
      }
    }
    return pagesHtml;
  };
  return (
    <>
      <ul className="pagination">
        {hasPrev && (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(prev)}>
              Trang trước
            </Link>
          </li>
        )}
        {renderPagesHtml().map((item, index) => (
          <li
            key={index}
            className={`page-item ${item === currentPage ? "active" : ""}`}
          >
            <Link
              onClick={(e) => onclickPage(e, item)}
              className="page-link"
              to={formatUrl(item)}
            >
              {item}
            </Link>
          </li>
        ))}
        {hasNext && (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(next)}>
              Trang sau
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Pagination;
