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
  // 타임스탬프 날짜 변경 함수
  const convertTimestamp = (writtenDate) => {
    let date = writtenDate.toDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    return (date = `${yyyy}-${mm}-${dd} ${hours}:${minutes}`);
  };
  useEffect(() => {
    const q = query(
      collection(dbService, "communityPost"),
      orderBy("writtenDate", "desc")
    );
    // refetch함수를 쓰면 db 다시 불러온다.
    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => {
        console.log("doc.id", doc.id);
        const newPost = {
          id: doc.id,
          title: doc.data().title,
          editorText: doc.data().editorText,
          writtenDate: convertTimestamp(doc.data().writtenDate),
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
          <div>글 제목: {post.title}</div>
          {/* <div>글아이디:{post.id}</div> */}
          <Link legacyBehavior key={post.id} href={`/communityPage/${post.id}`}>
            <a className="bg-orange-300">{post.title}</a>
          </Link>
          <div>작성일: {post.writtenDate}</div>
        </div>
      ))}
    </div>
  );
};

export default Community;
