import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { dbService } from "@/share/firebase";
import Link from "next/link";
const Community = () => {
  const [communityPost, setCommunityPost] = useState([]);
  useEffect(() => {
    // const getList = async () => {
    const q = query(
      collection(dbService, "communityPost"),
      orderBy("writtenDate", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => {
        console.log("doc.data().writtenDate.toDate()", doc.data().writtenDate);
        const newPost = {
          id: doc.id,
          ...doc.data(),
        };
        return newPost;
      });
      setCommunityPost(newPosts);
    });
  }, []);

  return (
    <div className="bg-slate-400 w-full">
      <Link href="/communityPage/new">글 작성하기</Link>
      <div>글 목록</div>
      {communityPost?.map((post) => (
        <div key={post.id}>
          <div>글 제목: {post.title}</div>
          <div>내용: {post.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Community;
