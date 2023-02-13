import { useState } from "react";
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
import { dbService } from "../../config/firebase";
import EditorComponent from "../../components/write/textEditor";

const NewCommunityPost = () => {
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");

  const newPost = {
    // 유저 아이디 아직 안넣음
    title,
    editorText,
    writtenDate: Timestamp.now(),
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "communityPost"), newPost);
    setTitle("");
    setEditorText("");
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
        ></input>
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
