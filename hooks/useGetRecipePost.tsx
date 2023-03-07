import { dbService } from "@/config/firebase";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetRecipePost = () => {
  const [recipePost, setRecipePost] = useState<any[]>([]);

  useEffect(() => {
    const getRecipePost = () => {
      const recipeRef = collection(dbService, "recipe");
      const q = query(recipeRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => {
          const newPost = {
            postId: doc.id,
            ...doc.data(),
          };
          return newPost;
        });
        setRecipePost(newPosts);
      });
    };
    getRecipePost();
  }, []);

  return { recipePost };
};

export default useGetRecipePost;
