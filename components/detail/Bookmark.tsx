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
  const [countBookMark, setCountBookMark] = useState<any>();
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
  //recipe에 유저 id 추가
  // useEffect(() => {
  //   onSnapshot(doc(dbService, "recipe", props.postId), (snapshot) => {
  //     setCountBookMark(snapshot.data());
  //   });
  // }, [dbService, props.postId]);

  //북마크 토글
  useEffect(() => {
    setToggleBookmark(
      bookMark.findIndex((mark) => mark.id === props.postId) !== -1
    );
  }, [bookMark, props.postId]);
  //북마크 db 추가 삭제
  const bookMarkPost = async () => {
    if (toggleBookmark) {
      setToggleBookmark(!toggleBookmark);
      //const copy = [...countBookMark.bookmarkCount];
      // const filter = copy.filter((item: any) => {
      //   return item !== currentUser;
      // });
      console.log("북마크 삭제");
      await deleteDoc(
        doc(dbService, "user", currentUser, "bookmarkPost", props.postId)
      );
      // updateDoc(doc(dbService, "user", currentUser), {
      //   bookmarkCount: filter,
      // });
    } else {
      setToggleBookmark(!toggleBookmark);
      console.log("북마크 추가");
      // const copy = [...countBookMark.bookmarkCount];
      // copy.push(currentUser);
      // await setDoc(doc(dbService, "user", currentUser, "bookmarkPost"), {
      //   recipeData: props.postId,
      // });
      await setDoc(
        doc(dbService, "user", currentUser, "bookmarkPost", props.postId),
        {
          postId: props.postId,
        }
      );
      //if 배열에 uid가 있으면 추가x,없으면 추가.
      // if (countBookMark.bookmarkCount?.includes(currentUser)) {
      //   copy;
      // } else {
      //   await updateDoc(doc(dbService, "user", currentUser), {
      //     bookmarkCount: props.postId,
      //   });
      //}
    }
  };

  return (
    <>
      {props.userData === "geust" ? null : bookMark.findIndex(
          (mark) => mark.id === props.postId
        ) ? (
        <button onClick={bookMarkPost}>북마크삭제</button>
      ) : (
        <button onClick={bookMarkPost}>북마크추가</button>
      )}

      {/* <div>북마크 갯수:{countBookMark?.bookmarkCount.length}</div> */}
    </>
  );
};

export default Bookmark;
