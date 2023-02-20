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
  // const [countBookMark, setCountBookMark] = useState<any>(
  //   props.targetWholeData
  // );
  const [toggleBookmark, setToggleBookmark] = useState<boolean>(true);

  //현재 로그인된 유저
  const currentUser: any = authService.currentUser?.uid;
  //유저 북마크 모아오기
  console.log("toggleBookmark", toggleBookmark);
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
  }, [dbService, props.postId]);
  // useEffect(() => {
  //   onSnapshot(doc(dbService, "recipe", props.postId), (snapshot) => {
  //     setCountBookMark(snapshot.data());
  //   });
  // }, [dbService, props.postId]);

  // localStorage불러오기
  useEffect(() => {
    let storedVisits = window.localStorage.getItem("toggleBookmark");
    if (storedVisits !== null) {
      const parsingtoggle = JSON.parse(storedVisits);
      setToggleBookmark(parsingtoggle);
      console.log("parsingtoggle,", parsingtoggle);
    }
  }, []);

  //북마크 토글
  useEffect(() => {
    setToggleBookmark(
      bookMark.findIndex((mark) => mark.id === props.postId) !== -1
    );
  }, [bookMark, props.postId]);

  //북마크 db 추가 삭제
  const bookMarkPost = async () => {
    //localStorage에 저장
    window.localStorage.setItem(
      "toggleBookmark",
      JSON.stringify(!toggleBookmark)
    );

    if (toggleBookmark) {
      setToggleBookmark(!toggleBookmark);
      console.log("북마크 삭제");
      await deleteDoc(
        doc(dbService, "user", currentUser, "bookmarkPost", props.postId)
      );
    } else {
      setToggleBookmark(!toggleBookmark);
      console.log("북마크 추가");
      await setDoc(
        doc(dbService, "user", currentUser, "bookmarkPost", props.postId),
        {
          recipeData: props.postId,
        }
      );
    }
  };

  return (
    <>
      {props.userData === "geust" ? null : toggleBookmark ? (
        <button onClick={bookMarkPost}>북마크삭제</button>
      ) : (
        <button onClick={bookMarkPost}>북마크추가</button>
      )}
    </>
  );
};

export default Bookmark;
