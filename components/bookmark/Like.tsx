import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import { authService, dbService } from "@/config/firebase";

const Like = ({ id, recipeData }: any) => {
  //북마크
  const [bookMark, setBookMark] = useState<any[]>([]);
  const [toggleBookmark, setToggleBookmark] = useState<boolean>(false);
  //현재 로그인된 유저
  const currentUser: any = authService.currentUser?.uid;
  //유저 북마크 모아오기
  useEffect(
    () =>
      onSnapshot(
        collection(dbService, "user", currentUser, "like"),
        (snapshot) => setBookMark(snapshot.docs)
      ),
    [dbService, id]
  );
  //북마크 토글
  useEffect(
    () =>
      setToggleBookmark(bookMark.findIndex((like) => like.id === id) !== -1),
    [bookMark]
  );
  const bookMarkPost = async () => {
    //jika udah ke toggleBookmark, maka akan ke unlike kalo di pencet lagi
    if (toggleBookmark) {
      await deleteDoc(doc(dbService, "user", currentUser, "like", id));
    } else {
      await setDoc(doc(dbService, "user", currentUser, "like", id), {
        recipeData,
      });
    }
  };
  return <button onClick={bookMarkPost}>like</button>;
};

export default Like;
