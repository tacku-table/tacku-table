import { dbService } from "@/config/firebase";
import {
  onSnapshot,
  query,
  getDocs,
  collection,
  orderBy,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// const useGetRecipePost = (userId: string) => {
//   let results;
//   useEffect(() => {
//     results = getMyRecipePost(userId);
//   }, []);
//   return results;
// };

// const getMyRecipePost = async (userId: string) => {
//   const results: any[] = [];
//   const q = query(
//     collection(dbService, "recipe"),
//     where("uid", "==", `${userId}`)
//   );
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     results.push({
//       postId: doc.id,
//       ...doc.data(),
//     });
//   });
//   return results;
// };
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
