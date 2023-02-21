import { useState, useRef } from "react";
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
  const newPost = {
    uid,
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
    <div className="w-full h-full mt-[74px] flex flex-col items-center">
      <div className="w-[1180px]  ">
        <p className="text-4xl font-bold pb-6 border-b-2 border-brand100  ">
          커뮤니티 글쓰기
        </p>
        <div className="w-52 h-11 flex mt-5">
          <select
            onChange={(event) => {
              setSelectCategory(event.target.value);
            }}
            ref={categoryRef}
            className="rounded-sm p-3 h-12 border-2 border-mono60 text-mono80 text-input "
          >
            <option value="none">카테고리 선택를 선택하세요.</option>
            <option value="요리">요리게시판</option>
            <option value="애니">애니게시판</option>
            <option value="잡담">잡담게시판</option>
          </select>
        </div>
        <form onSubmit={handleOnSubmit}>
          <input
            className="w-full h-12 rounded-sm border-2 border-mono60 p-3 my-6 text-input"
            type="text"
            onChange={handleChangeTitle}
            value={title}
            required
            placeholder="제목을 입력해주세요."
          />
          <EditorComponent
            editorText={editorText}
            setEditorText={setEditorText}
          />
          <button
            className="w-44 h-11 mt-11 float-right text-white bg-brand100 font-medium"
            type="submit"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCommunityPost;
