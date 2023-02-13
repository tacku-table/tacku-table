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
import EditorComponent from "../../components/write/TextEditor";
// import TextEditor from "../../components/TextEditor";

const NewCommunityPost = () => {
  // const [content, setContent] = useState("");
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");

  const newPost = {
    // 유저 아이디 아직 안넣음
    title,
    content: editorText,
    writtenDate: Timestamp.now(),
  };

  // const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  // const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };

  // 이 함수를 Quill의 onChange로 넘겨줬는데 value에러를 계속 뱉어냄
  // setContent를 넘겨주어 해결
  // const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setContent(event.target.value);
  // };
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    await addDoc(collection(dbService, "communityPost"), newPost);
    setTitle("");
    // setContent("");
    setEditorText("");
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // const handleChangeContent = (event) => {
  //   setContent(event.target.value);
  // };
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
          className="w-full h-96"
          editorText={editorText}
          setEditorText={setEditorText}
        />
        {/* <TextEditor content={content} setContent={setContent} /> */}
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default NewCommunityPost;
