import { dbService } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getMyBookmark = async (userId: string): Promise<TBookmark[]> => {
  const results: any[] = [];
  const snap = await getDocs(
    collection(dbService, `user/${userId}/bookmarkPost`)
  );
  snap.forEach((doc) => {
    results.push({
      postId: doc.id,
      writerUid: doc.data().uid,
      writerdisplayName: doc.data().writerNickName,
      writerImg: doc.data().writerProfileImg,
      ...doc.data(),
    });
  });
  return results;
};
