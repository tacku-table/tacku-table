import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  getDocs,
  query,
} from "@firebase/firestore";
import { authService, dbService } from "@/config/firebase";

const Bookmark = (props: any) => {
  //북마크
  const [bookMark, setBookMark] = useState<any[]>([]);
  const [countBookMark, setCountBookMark] = useState<any>(
    props.targetWholeData
  );
  const [toggleBookmark, setToggleBookmark] = useState<boolean>(false);
  let currenDetailUser = props.storageCurrentUser.uid;

  //북마크 토글
  useEffect(() => {
    setToggleBookmark(
      bookMark.findIndex((mark) => mark.id === props.postId) !== -1
    );
  }, [bookMark, props.postId]);

  //유저 북마크 모아오기
  useEffect(() => {
    const bookmarkLoad = () => {
      try {
        onSnapshot(
          collection(dbService, "user", currenDetailUser, "bookmarkPost"),
          (snapshot) => setBookMark(snapshot.docs)
        );
      } catch (err) {
        console.log(err);
      }
    };
    bookmarkLoad();
  }, [currenDetailUser]);

  //북마크 db 추가 삭제
  const bookMarkPost = async () => {
    if (toggleBookmark) {
      setToggleBookmark(!toggleBookmark);
      console.log("북마크 삭제");
      await deleteDoc(
        doc(dbService, "user", currenDetailUser, "bookmarkPost", props.postId)
      );
    } else {
      setToggleBookmark(!toggleBookmark);
      console.log("북마크 추가");
      await setDoc(
        doc(dbService, "user", currenDetailUser, "bookmarkPost", props.postId),
        {
          thumbnail: props.targetWholeData.thumbnail,
          foodTitle: props.targetWholeData.foodTitle,
          writerNickName: props.userData.userNickname,
          writerProfileImg: props.userData.userImg,
          viewCount: props.targetWholeData.viewCount,
          cookingTime: props.targetWholeData.cookingTime,
          animationTitle: props.targetWholeData.animationTitle,
          uid: props.targetWholeData.uid,
        }
      );
    }
  };

  return (
    <>
      {toggleBookmark ? (
        <button onClick={bookMarkPost}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-brand100"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <button onClick={bookMarkPost}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-mono60"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default Bookmark;
