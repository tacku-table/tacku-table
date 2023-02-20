import { useState, useRef, useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { authService, dbService } from "../../config/firebase";
import EditorComponent from "../../components/write/textEditor";

const NewCommunityPost = () => {
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");

  // 카테고리 추가
  const [selectCategory, setSelectCategory] = useState("");
  const categoryRef = useRef(null);

  const user = authService?.currentUser;
  const uid = user?.uid;
  const nickname = user?.displayName;

  const newPost = {
    uid,
    nickname,
    title,
    editorText,
    writtenDate: Timestamp.now(),
    category: selectCategory,
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!selectCategory) {
      categoryRef.current?.focus();
      return false;
    }
    if (!editorText || editorText === "<p><br></p>") {
      alert("본문 입력은 필수입니다 :)");
      return false;
    }
    await addDoc(collection(dbService, "communityPost"), newPost);
    setTitle("");
    setEditorText("");
    setSelectCategory("");
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="px-4 py-8 bg-slate-400">
      <span>글쓰기</span>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col w-full items-center justify-center"
      >
        <input
          className="w-96 h-10 mb-4"
          type="text"
          onChange={handleChangeTitle}
          value={title}
          required
        />
        <select
          onChange={(event) => {
            setSelectCategory(event.target.value);
          }}
          ref={categoryRef}
          className="focus:ring-2 focus:outline-none ring-offset-2 ring-white  ring-offset-orange-400"
        >
          <option value="none">=== 카테고리 선택 ===</option>
          <option value="요리">요리</option>
          <option value="애니">애니</option>
          <option value="잡담">잡담</option>
        </select>
        <EditorComponent
          editorText={editorText}
          setEditorText={setEditorText}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default NewCommunityPost;
