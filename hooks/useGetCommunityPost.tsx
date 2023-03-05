import { dbService } from "@/config/firebase";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { convertTimestamp } from "@/util";

const useGetCommunityPost = () => {
  const [communityPost, setCommunityPost] = useState<any[]>([]);

  useEffect(() => {
    const getCommunityPost = async () => {
      const communityRef = collection(dbService, "communityPost");
      const q = query(communityRef, orderBy("writtenDate", "desc"));
      onSnapshot(q, (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => {
          let nickname;
          const newPost = {
            id: doc.id,
            category: doc.data().category,
            title: doc.data().title,
            editorText: doc.data().editorText,
            writtenDate: convertTimestamp(doc.data().writtenDate),
            thumbnail: doc.data().thumbnail,
            // nickname: doc.data().nickname
            nickname: nickname,
          };
          return newPost;
        });
        setCommunityPost(newPosts);
        //   console.log(communityList);
      });
    };

    getCommunityPost();
  }, [communityPost]);

  return { communityPost };
};

export default useGetCommunityPost;
