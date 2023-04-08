import React from "react";

const Pagination = ({ totalPages, paginate }) => {
  return (
    <div className="columns">
      <div className="column is-full">
        <nav className="pagination is-centered " role="navigation" aria-label="pagination">
          <ul className="pagination-list">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <a
                  className="pagination-link is-current"
                  onClick={() => paginate(index + 1)}
                  aria-label={`Goto page ${index + 1}`}
                >
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
