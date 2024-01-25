import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { asyncCreateThread } from "../states/threads/action";

export default function CreateThreadPage() {
  const [title, setTitle] = useInput("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useInput("");
  const [titleError, setTitleError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onBodyChangeHandler = (e) => {
    setBody(e.target.innerHTML);
  };

  const onSubmitNewThread = (e) => {
    e.preventDefault();
    if (title === "" && category === "" && body === "") {
      setTitleError(true);
      setCategoryError(true);
      setBodyError(true);
    } else if (category === "") {
      setCategoryError(true);
    } else if (title === "") {
      setTitleError(true);
      setCategoryError(true);
    } else if (body === "") {
      bodyError(true);
    } else {
      dispatch(asyncCreateThread({ title, body, category }));
      navigate("/");
    }
  };

  const roleBody = "role-body";

  return (
    <div className="create-disscuss">
      <h1>Buat Diskusi Baru</h1>
      <form onSubmit={onSubmitNewThread}>
        <label htmlFor="title">
          Judul*
          <input
            type="text"
            placeholder="Judul"
            value={title}
            onChange={setTitle}
          />
          {titleError && (
            <p className="error-msg-input">Judul tidak boleh kosong</p>
          )}
        </label>
        <label htmlFor="category">
          Kategori*
          <input
            type="text"
            placeholder="Kategori diskusi"
            value={category}
            onChange={setCategory}
          />
          {categoryError && (
            <p className="error-msg-input">Kategori tidak boleh kosong</p>
          )}
        </label>
        <div className="label">
          <p>Diskusi*</p>
          <div
            role={roleBody}
            className="comment-field-input"
            onInput={onBodyChangeHandler}
            contentEditable
            suppressContentEditableWarning
          />
          {bodyError && <p className="error-msg-input">Body harus diisi</p>}
        </div>
        <button type="submit" className="btn">
          Buat Diskusi
        </button>
      </form>
    </div>
  );
}
