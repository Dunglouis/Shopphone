import React from "react";
import { Link, useParams } from "react-router-dom";

const PaginationProductDetail = ({ pages }) => {
  const { total, totalPages, currentPage, next, prev, hasNext, hasPrev } =
    pages;
  const { id } = useParams();
  const onclickPage = (e, page) => {
    if (page === "...") return e.preventDefault();
  };
  const formatUrl = (page) => {
    return `/productdetails-${id}?page=${page}`;
  };

  const renderHtmlPages = (delta = 1) => {
    const htmlPages = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        htmlPages.push(i);
      } else if (i === left - 1 || i === right + 1) {
        htmlPages.push("...");
      }
    }
    return htmlPages;
  };
  return (
    <>
      <ul className="pagination">
        {hasPrev && (
          <li className="page-item">
            <Link className="page-link" to={`${formatUrl(prev)}`}>
              Trang trước
            </Link>
          </li>
        )}
        {renderHtmlPages().map((item, index) => (
          <li
            key={index}
            className={`page-item ${item === currentPage ? "active" : ""}`}
          >
            <Link
              onClick={(e) => onclickPage(e, item)}
              className="page-link"
              to={`${formatUrl(item)}`}
            >
              {item}
            </Link>
          </li>
        ))}
        {hasNext && (
          <li className="page-item">
            <Link className="page-link" to={`${formatUrl(next)}`}>
              Trang sau
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default PaginationProductDetail;
