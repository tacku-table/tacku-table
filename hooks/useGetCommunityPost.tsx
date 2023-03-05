import { dbService } from "@/config/firebase";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { convertTimestamp } from "@/util";

const useGetCommunityPost = () => {
  const [communityPost, setCommunityPost] = useState<any[]>([]);

  useEffect(() => {
    const getCommunityPost = () => {
      const communityRef = collection(dbService, "communityPost");
      const q = query(communityRef, orderBy("writtenDate", "desc"));
      onSnapshot(q, (snapshot) => {
        const newPosts = snapshot.docs.map((d) => {
          const newPost = {
            id: d.id,
            writterUid: d.data().uid,
            category: d.data().category,
            title: d.data().title,
            editorText: d.data().editorText,
            writtenDate: convertTimestamp(d.data().writtenDate),
            thumbnail: d.data().thumbnail,
          };
          return newPost;
        });
        setCommunityPost(newPosts);
      });
    };

    getCommunityPost();
  }, [communityPost]);

  return { communityPost };
};

export default useGetCommunityPost;
