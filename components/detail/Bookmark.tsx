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
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const Bookmark = (props: any) => {
  //북마크
  const [bookMark, setBookMark] = useState<any[]>([]);
  const [countBookMark, setCountBookMark] = useState<any>(
    props.targetWholeData
  );
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
  }, [dbService, props.postId]);

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
          thumbnail: props.recipeData.thumbnail,
          foodTitle: props.recipeData.foodTitle,
          writerNickName: props.recipeData.writerNickName,
          viewCount: props.recipeData.viewCount,
          cookingTime: props.recipeData.cookingTime,
        }
      );
    }
  };

  return (
    <>
      {props.userData === "geust" ? null : toggleBookmark ? (
        <button onClick={bookMarkPost}>
          <BsBookmarkFill />
        </button>
      ) : (
        <button onClick={bookMarkPost}>
          <BsBookmark />
        </button>
      )}
    </>
  );
};

export default Bookmark;
