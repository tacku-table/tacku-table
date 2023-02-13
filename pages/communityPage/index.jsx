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
    // const getList = async () => {
    const q = query(
      collection(dbService, "communityPost"),
      orderBy("writtenDate", "desc")
    );
    // refetch함수를 쓰면 db 다시 불러온다.
    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => {
        console.log(doc.data().writtenDate.toDate());
        console.log("doc.id", doc.id);
        const newPost = {
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          writtenDate: doc.data().writtenDate.toDate().toString(),
        };
        return newPost;
      });
      setCommunityPost(newPosts);
    });
  }, []);

  return (
    <div>
      <div>글 목록</div>
      <div>
        <Link href="/communityPage/new">글 작성하기</Link>
      </div>
      {communityPost?.map((post) => (
        <div key={post.id}>
          <Link legacyBehavior href={`/communityPage/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Community;
