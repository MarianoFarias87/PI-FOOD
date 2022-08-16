import React, { useState } from "react";
import s from "./Pagination.module.css";

export default function Pagination({ page, setPage, totalPages }) {
  const [input, setInput] = useState(1);

  const previous = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(input) - 1);
  };

  const next = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(input) + 1);
  };

  const enter = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (
        Number(e.target.value < 1) ||
        parseInt(e.target.value) > totalPages ||
        isNaN(parseInt(e.target.value))
      ) {
        setPage(1);
        setInput(page);
      }
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <button className={s.pagination} onClick={previous} disabled={page <= 1}>
        Prev
      </button>
      <input
        onChange={handleChange}
        onKeyDown={enter}
        name="page"
        value={input}
        maxLength={2}
        autoComplete="off"
        className={s.input}
      />
      <span className={s.span}> de {totalPages}</span>
      <button
        className={s.pagination}
        onClick={next}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}