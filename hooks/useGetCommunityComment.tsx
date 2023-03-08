import { dbService } from "@/config/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const useGetCommunityComment = (boardId: string) => {
  const [comment, setComment] = useState("");
  const [boardComments, setBoardComments] = useState([]);
  const [editComment, setEditComment] = useState("");
  const [targetIndex, setTargetIndex] = useState("");
  const [targetIsEdit, setTargetIsEdit] = useState("");
  const [commentWriterNickName, setCommentWriterNickName] = useState<
    string | undefined
  >("");
  const [commentProfile, setCommentProfile] = useState<string | undefined>("");
  const [reloadState, setReloadState] = useState("");

  useEffect(() => {
    getComments();
  }, [reloadState]);

  let commentsListArray: any = [];
  const getComments = async () => {
    setReloadState("reset");
    const q = query(
      collection(dbService, "comments"),
      where("boardId", "==", boardId),
      orderBy("ordeyByDate", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const WritterUID = doc.data().uid;
      getUserInfoInUserCollection(WritterUID)
        .then(
          (
            item:
              | {
                  userUID: string;
                  userNickname: string;
                  userImg: string;
                }
              | undefined
          ) => {
            const userNickname: string | undefined = item?.userNickname;
            const userImg: string | undefined = item?.userImg;
            setCommentWriterNickName(userNickname);
            setCommentProfile(userImg);
            return { userNickname, userImg };
          }
        )
        .then((res) => {
          const comments = {
            id: doc.id,
            commentProfile: res.userImg,
            commentWriterNickName: res.userNickname,
            ...doc.data(),
          };
          commentsListArray.push(comments);
          setBoardComments(commentsListArray);
          setComment("");
          setTargetIndex("reset");
          setTargetIsEdit("reset");
          setEditComment("");
        });
    });
  };

  //User 컬랙션에셔 실시간 유저 정보 가져오는 함수
  const getUserInfoInUserCollection = async (commentsWritterUID: string) => {
    const docRef = doc(dbService, "user", commentsWritterUID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const commentUserInfo = {
        userUID: userData.userId,
        userNickname: userData.userNickname,
        userImg: userData.userImg,
      };
      return commentUserInfo;
    } else {
      console.log("No such document!");
    }
    // return commentUserInfo;
  };

  return { boardComments, comment, setComment, setReloadState };
};

export default useGetCommunityComment;
