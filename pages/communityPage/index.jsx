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
import { dbService } from "@/config/firebase";
import Link from "next/link";

const Community = () => {
  const [communityPost, setCommunityPost] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "communityPost"),
      orderBy("writtenDate", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => {
        console.log(doc.data().writtenDate.toDate());
        console.log("doc.id", doc.id);
        const newPost = {
          id: doc.id,
          title: doc.data().title,
          editorText: doc.data().editorText,
          writtenDate: doc.data().writtenDate.toDate().toString(),
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
          <div>글아이디:{post.id}</div>
          <Link key={post.id} href={`/communityPage/${post.id}`} post={post}>
            날 클릭하면 상세페이지로 이동해요😍 {post.title}
          </Link>
          <div>내용: {post.editorText}</div>
          <div>작성일: {post.writtenDate}</div>
        </div>
      ))}
    </div>
  );
};

export default Community;
