import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { authService, dbService } from "@/config/firebase";

const Bookmark = ({ id, recipeData }: any) => {
  //북마크
  const [bookMark, setBookMark] = useState<any[]>([]);
  const [postbookMark, setpostBookMark] = useState<number>(0);
  const [toggleBookmark, setToggleBookmark] = useState<boolean>(false);
  console.log(postbookMark);
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

  const postBookMarkToggle = async () => {
    if (toggleBookmark === true) {
      return setpostBookMark(postbookMark - 1);
    } else {
      return setpostBookMark(postbookMark + 1);
    }
  };
  const bookMarkPost = async () => {
    if (toggleBookmark) {
      console.log("북마크 삭제");
      postBookMarkToggle();
      await deleteDoc(doc(dbService, "user", currentUser, "like", id));
      await updateDoc(doc(dbService, "recipePost", id), {
        likecount: postbookMark,
      });
    } else {
      console.log("북마크 추가");
      postBookMarkToggle();
      await setDoc(doc(dbService, "user", currentUser, "like", id), {
        recipeData,
      });
      await updateDoc(doc(dbService, "recipePost", id), {
        likecount: postbookMark,
      });
    }
  };
  return <button onClick={bookMarkPost}>북마크</button>;
};

export default Bookmark;
