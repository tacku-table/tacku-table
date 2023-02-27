import React from "react";

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ total, limit, page, setPage }: PaginationProps) => {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <nav>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          이전
        </button>
        {[...Array(numPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 && "page"}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          다음
        </button>
      </nav>
    </>
  );
};

export default Pagination;
