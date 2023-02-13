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
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
export default function DetailPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    getDoc(doc(dbService, "communityPost", router.query.id)).then((doc) => {
      const data = doc.data();
      setTitle(data.title);
      setContent(data.content);
    });
  }, []);
  return (
    <div>
      <div>글 제목: {title}</div>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  );
}
