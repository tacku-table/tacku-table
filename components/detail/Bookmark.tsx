import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  query,
} from "@firebase/firestore";
import { authService, dbService } from "@/config/firebase";

const Bookmark = (props: any) => {
  //북마크
  const [bookMark, setBookMark] = useState<any[]>([]);
  let [markArr, setmarkArr] = useState<any[]>([]);
  const [toggleBookmark, setToggleBookmark] = useState<boolean>(false);
  //현재 로그인된 유저
  const currentUser: any = authService.currentUser?.uid;
  //유저 북마크 모아오기
  useEffect(() => {
    const bookmarkLoad = async () => {
      try {
        await onSnapshot(
          collection(dbService, "user", currentUser, "bookmarkPost"),
          (snapshot) => setBookMark(snapshot.docs)
        );
      } catch (err) {
        console.log(err);
      }
    };
    bookmarkLoad();
  }, []);

  //북마크 토글
  useEffect(
    () =>
      setToggleBookmark(
        bookMark.findIndex((mark) => mark.id === props.postId) !== -1
      ),
    [bookMark]
  );
  //북마크 db 추가 삭제
  const bookMarkPost = async () => {
    const copy = [...markArr, currentUser];
    const filter = markArr.filter((item: any) => {
      return item !== currentUser.item;
    });
    if (toggleBookmark) {
      console.log("북마크 삭제");
      await deleteDoc(
        doc(dbService, "user", currentUser, "bookmarkPost", props.postId)
      );
      updateDoc(doc(dbService, "recipe", props.postId), {
        bookmarkCount: filter,
      });
    } else {
      console.log("북마크 추가");

      await setDoc(
        doc(dbService, "user", currentUser, "bookmarkPost", props.postId),
        {
          recipeData: props.recipeData,
        }
      );
      updateDoc(doc(dbService, "recipe", props.postId), {
        bookmarkCount: copy,
      });
    }
  };

  return (
    <>
      <button onClick={bookMarkPost}>북마크</button>
      <div>북마크갯수 : {markArr}</div>
    </>
  );
};

export default Bookmark;
