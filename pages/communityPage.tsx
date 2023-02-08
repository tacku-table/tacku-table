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
} from "firebase/firestore";

import { dbService } from "@/firebase";
const CommunityPage = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const newPost = {
    // 유저 아이디 아직 안넣음
    title,
    content,
    writtenDate: Date.now(),
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addDoc(collection(dbService, "communityPost"), newPost);
    setTitle("");
    setContent("");
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="px-4 py-8 bg-slate-400">
      <span>글쓰기</span>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={handleChangeTitle}
          value={title}
          required
        ></input>
        <input
          type="text"
          onChange={handleChangeContent}
          value={content}
          required
        ></input>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default CommunityPage;
