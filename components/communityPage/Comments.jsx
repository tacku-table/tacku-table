import { dbService } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import baseImg from "../../public/images/test1.png";
import { toast, ToastContainer } from "react-toastify";

const Comments = ({ boardId, uid }) => {
  const [comment, setComment] = useState("");
  const [boardComments, setBoardComments] = useState([]);
  const [editComment, setEditComment] = useState("");
  const [targetIndex, setTargetIndex] = useState("");
  const [targetIsEdit, setTargetIsEdit] = useState("");
  const [commentWriterNickName, setCommentWriterNickName] = useState("");
  const [commentProfile, setCommentProfile] = useState("");
  const commentRef = useRef("");

  useEffect(() => {
    getComments();
  }, []);

  let commentsListArray = [];

  const toastAlert = (alertText) => {
    toast(`${alertText}`, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // 댓글 get
  const getComments = async () => {
    const q = query(
      collection(dbService, "comments"),
      where("boardId", "==", boardId),
      orderBy("ordeyByDate", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const WritterUID = doc.data().uid;
      getUserInfoInUserCollection(WritterUID)
        .then((item) => {
          const userNickname = item.userNickname;
          const userImg = item.userImg;
          setCommentWriterNickName(userNickname);
          setCommentProfile(userImg);
          return { userNickname, userImg };
        })
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
  const getUserInfoInUserCollection = async (commentsWritterUID) => {
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
    return commentUserInfo;
  };

  // 댓글 add
  const addComment = async (event) => {
    event.preventDefault();
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;
    //댓글 공백, 빈칸 유효성 검사
    if (!comment || !comment.trim().length) {
      toastAlert("😥 댓글이 입력되지 않았어요 ");
      commentRef.current?.focus();
      return false;
    }

    const newComment = {
      uid,
      boardId,
      comment,
      writtenDate: dateString,
      ordeyByDate: new Date(),
    };
    await addDoc(collection(dbService, "comments"), newComment);
    getComments();
    toastAlert("🎉 댓글 저장 성공!");
  };

  // 댓글 delete
  const deleteComment = async (id) => {
    const userConfirm = window.confirm("해당 댓글을 정말 삭제하시겠습니까?");
    if (userConfirm) {
      try {
        await deleteDoc(doc(dbService, "comments", id));
        toastAlert("🗑 댓글이 삭제되었습니다");
        getComments();
      } catch (error) {
        alert(error);
      }
    }
  };

  const commentEdit = async (id, index) => {
    setTargetIndex(index);
    setTargetIsEdit(index);
    const postRef = doc(dbService, "comments", id);
    if (editComment) {
      await updateDoc(postRef, {
        comment: editComment,
      });
      toastAlert("🎉 댓글 수정 완료!");
      setTargetIsEdit(!index);
      setTargetIndex(!index);
      getComments();
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} />
      <div>
        <h3 className="text-[21px]">
          댓글 <b className="text-[#FF0000]">{boardComments.length}</b>
        </h3>

        <div>
          <div>
            {boardComments?.map((item, index) => {
              return (
                <div key={index}>
                  {/* targetIndex === index : 수정 input열리는 부분 */}
                  {targetIndex === index ? (
                    <div>
                      {item.commentProfile == "null" ? (
                        <Image
                          className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                          src={baseImg}
                          width={780}
                          height={270}
                          alt="대표 이미지가 없습니다."
                        />
                      ) : (
                        <Image
                          className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                          src={item.commentProfile}
                          loader={({ src }) => src}
                          width={780}
                          height={270}
                          alt="대표 이미지가 없습니다."
                        />
                      )}
                      <h3 className="text-[12px] pt-1">
                        {item.commentWriterNickName}
                      </h3>
                      <input
                        placeholder="수정할 댓글을 작성해주세요"
                        className="text-[12px] border border-mono80 w-[320px] rounded-[2px]"
                        key={index}
                        type="text"
                        value={editComment}
                        onChange={(e) => {
                          setEditComment(e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      {item.commentProfile === "null" ? (
                        <Image
                          className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                          src={baseImg}
                          width={780}
                          height={270}
                          alt="대표 이미지가 없습니다."
                        />
                      ) : (
                        <Image
                          className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                          src={item.commentProfile}
                          loader={({ src }) => src}
                          width={780}
                          height={270}
                          alt="대표 이미지가 없습니다."
                        />
                      )}
                      <div>
                        <span className="text-[12px]">
                          {item.commentWriterNickName}
                        </span>
                        <span className="ml-2 text-mono80 text-[12px]">
                          {item.writtenDate}
                        </span>
                        <p className="ml-2 text-mono80 text-[12px]">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )}
                  {uid === item.uid ? (
                    <div className="flex justify-end mb-1">
                      <button
                        className="text-[12px] text-mono80"
                        type="button"
                        onClick={() => {
                          deleteComment(item.id);
                        }}
                      >
                        삭제
                      </button>
                      <button
                        className="text-[12px] ml-1 mr-1 text-mono80"
                        type="button"
                        onClick={() => {
                          setEditComment(item.comment);
                          // 댓글 id
                          commentEdit(item.id, index);
                        }}
                      >
                        {targetIsEdit === index ? "완료 " : "수정"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end mb-1 h-5"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {uid === "guest" ? (
        <div className="w-full text-center mt-5">
          <input
            disabled
            className="h-[90px] w-5/6 border-[2px] border-brand100"
            type="text"
            placeholder=" 로그인 후 댓글 작성해주세요."
          />
          <button
            className="ml-2 text-white border-none bg-brand100 w-[80px] h-[90px] lg:w-1/8 md:w-1/8 sm:1/8"
            type="button"
            style={{ border: "1px solid black" }}
          >
            로그인
          </button>
        </div>
      ) : (
        <div className="w-full text-center mt-5">
          <input
            ref={commentRef}
            className="border-mono80 border rounded-[2px] h-[90px] w-5/6 p-3"
            placeholder=" 타쿠의식탁 커뮤니티가 훈훈해지는 댓글을 남겨주세요."
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            className="rounded-[2px] ml-2 text-white border-none bg-brand100 w-[80px] h-[90px] lg:w-1/8 md:w-1/8 sm:1/8"
            type="button"
            onClick={addComment}
          >
            등록
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
