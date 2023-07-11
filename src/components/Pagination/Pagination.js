import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination  justify-content-center py-5 " >
      {currentPage > 1 && (
          <li className="page-item">
            <button className="page-link bg-dark text-white" onClick={() => onPageChange(currentPage - 1)}>
            <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item  ${currentPage === number ? 'active' : ''}  `}
           
          >
            <button
              className="page-link bg-dark text-white"
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}

{currentPage < totalPages && (
          <li className="page-item">
            <button className="page-link bg-dark text-white" onClick={() => onPageChange(currentPage + 1)}>
            <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
