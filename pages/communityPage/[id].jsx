import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  where,
  getDocs,
  Timestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "@/config/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditorComponent from "../../components/write/textEditor";
import baseImg from "/public/images/test1.png";
import Image from "next/image";
import { convertTimestamp } from "../../util";

export default function DetailPage(props) {
  const [detailPageWholeData, setDetailPageWholeData] = useState({});
  const [comment, setComment] = useState("");
  const [boardComments, setBoardComments] = useState([]);
  const [isPostEdit, setIsPostEdit] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [uid, setUid] = useState("");
  const [targetIndex, setTargetIndex] = useState("");
  const [targetIsEdit, setTargetIsEdit] = useState("");
  const [commentWriterNickName, setCommentWriterNickName] = useState("");
  const router = useRouter();
  //여기 게시글
  const [editPostTitle, setEditPostTitle] = useState(
    props.targetWholeData.title
  );
  const [editPostContent, setEditPostContent] = useState(
    props.targetWholeData.editorText
  );

  useEffect(() => {
    const sessionStorageUser = sessionStorage.getItem("User") || "";
    if (sessionStorageUser) {
      const parsingUser = JSON.parse(sessionStorageUser);
      setUid(parsingUser?.uid);
      // console.log(parsingUser?.displayName);
      setCommentWriterNickName(parsingUser?.displayName);
    }
    if (!sessionStorageUser) {
      setUid("geust");
    }
  }, []);
  useEffect(() => {
    setDetailPageWholeData(props.targetWholeData);
    getWholeComments();
  }, []);

  // 댓글 get
  let commentWholeData = [];
  const getWholeComments = async () => {
    const q = query(
      collection(dbService, "comments"),
      where("boardId", "==", props.targetId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const comments = {
        id: doc.id,
        ...doc.data(),
      };
      console.log(doc.id, " => ", doc.data());
      commentWholeData.push(comments);
    });
    setBoardComments(commentWholeData);
    setComment("");
    setTargetIndex("reset");
    setTargetIsEdit("reset");
    setEditComment("");
    boardComments.map((item) => console.log("나다", item));
  };

  // 글 수정
  const updatePost = async (postId) => {
    // 수정이랑 완료랑 같이..관리중
    // 버튼 클릭-> isPostEdit(true) -> 편집에서 완료
    setIsPostEdit(!isPostEdit);
    const docRef = doc(dbService, "communityPost", postId);
    await updateDoc(docRef, {
      title: editPostTitle,
      editorText: editPostContent,
      writtenDate: Timestamp.now(),
    });
    // 업데이트 된 후에...
    // getDoc
    getDoc(doc(dbService, "communityPost", postId)).then((doc) => {
      const data = doc.data();
      setDetailPageWholeData({
        title: data.title,
        editorText: data.editorText,
        writtenDate: convertTimestamp(data.writtenDate),
      });
    });
  };
  // 글 삭제
  const deletePost = async (postId) => {
    const userConfirm = window.confirm("해당 글을 삭제하시겠습니까?");
    if (userConfirm) {
      try {
        await deleteDoc(doc(dbService, "communityPost", postId));
        router.back();
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  // 댓글 추가, 삭제, 편집
  const addComment = async (event) => {
    event.preventDefault();
    // uid : 댓글 작성자 id
    // boardId : 게시물 id
    // 게시물 id는 firebase에서 자동으로 들어간다.

    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;
    console.log("현재날짜:", dateString);

    const newComment = {
      uid,
      boardId: props.targetId,
      comment,
      writterNickName: commentWriterNickName,
      writtenDate: dateString,
    };
    await addDoc(collection(dbService, "comments"), newComment);
    getWholeComments();
    alert("댓글 저장 성공!");
  };
  const deleteComment = async (id) => {
    console.log("댓글 id?", id);
    const userConfirm = window.confirm("해당 댓글을 정말 삭제하시겠습니까?");
    if (userConfirm) {
      try {
        await deleteDoc(doc(dbService, "comments", id));
        alert("댓글 삭제 완료!");
        getWholeComments();
      } catch (error) {
        alert(error);
      }
    }
  };
  const commentEdit = async (id, index) => {
    // id는 해당 게시물의 고유 id
    console.log(id);
    console.log("index:", index);
    setTargetIndex(index);
    setTargetIsEdit(index);
    const postRef = doc(dbService, "comments", id);
    if (editComment) {
      await updateDoc(postRef, {
        comment: editComment,
      });
      alert("댓글 수정 완료!");
      // setEditComment("");
      setTargetIsEdit(!index);
      setTargetIndex(!index);
      getWholeComments();
    }
  };

  const moveMainPage = () => {
    location.href = "/communityPage";
  };

  return (
    <div className="bg-[#FFF5F5] ">
      <div className="pt-[75px] rounded-md p-7 container w-[780px] mx-auto flex justify-center flex-col bg-white">
        <h3 className="text-4xl pt-[24px]">잡담게시판</h3>
        <div className=" flex justify-end">
          <button
            onClick={moveMainPage}
            type="button"
            className="bg-brand100 text-white h-[35px]  w-[100px]"
          >
            목록보기
          </button>
        </div>

        <hr class="mt-[15px] h-px my-2 bg-brand100 border-[2px] border-brand100"></hr>
        <div>
          {isPostEdit ? (
            <>
              <div className="p-3">
                <div className="text-mono100 pb-2 ml-1"> 글제목</div>
                <input
                  className="border w-[320px] mb-3 text-[14px] p-3 rounded-[2px] border-mono60 text-mono80"
                  type="text"
                  value={editPostTitle}
                  onChange={(e) => {
                    setEditPostTitle(e.target.value);
                  }}
                />
                <div className="text-mono100 pb-2 ml-1"> 글내용 </div>

                <EditorComponent
                  setEditorText={setEditPostContent}
                  editorText={editPostContent}
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-[24px] text-mono100 font-medium pt-[30px]">
                {detailPageWholeData.title}
              </div>
              <div className="flex justify-end">
                <div className="text-[16px] text-mono80">
                  {detailPageWholeData.nickname}
                </div>
                <div className="ml-2 text-[16px] text-mono80">
                  {detailPageWholeData.writtenDate}
                </div>
                {/* <span>{detailPageWholeData.writtenDate}</span> */}
              </div>

              <div className="block h-[60px]">
                <Image
                  className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                  src={baseImg}
                  width={780}
                  height={270}
                  alt="대표 이미지가 없습니다."
                />
                <h3 className="relative top-[15px]">
                  {detailPageWholeData.nickname}
                </h3>
                <hr class="h-px my-10 bg-mono50 border-[1px] border-mono50"></hr>
              </div>
              <div className="mt-10 text-center">
                {/* 대표사진 */}
                <Image
                  className="w-[780px] h-[270px] lg:w-5/6 md:w-5/6 mb-10 m-auto"
                  src={baseImg}
                  width={780}
                  height={270}
                  alt="대표 이미지가 없습니다."
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailPageWholeData.editorText,
                  }}
                />
              </div>
            </>
          )}
          {uid === props.targetWholeData.uid && (
            <div className="flex float-right mt-2">
              <button
                className="text-mono80 bg-mono50 text-[16px] w-[80px] h-[30px]"
                onClick={() => updatePost(props.targetId)}
              >
                {isPostEdit ? "완료" : "수정"}
              </button>
              <button
                className="text-mono80 bg-mono50 text-[16px] w-[80px] h-[30px] ml-2"
                onClick={() => deletePost(props.targetId)}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <hr class="h-px my-8 bg-brand100 border-[1px] border-brand100"></hr>
        <div>
          <div>
            <h3 className="text-[21px]">
              댓글 <b className="text-[#FF0000]">{boardComments.length}</b>
            </h3>

            <div>
              <div>
                {boardComments?.map((item, index) => {
                  return (
                    <>
                      {targetIndex === index ? (
                        <div>
                          <Image
                            className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                            src={baseImg}
                            width={780}
                            height={270}
                            alt="대표 이미지가 없습니다."
                          />
                          <h3 className="text-[12px] pt-1">
                            {item.writterNickName}
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
                          <Image
                            className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                            src={baseImg}
                            width={780}
                            height={270}
                            alt="대표 이미지가 없습니다."
                          />

                          <div>
                            <span className="text-[12px]">
                              {item.writterNickName}
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
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {uid === "geust" ? (
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
                className="border-mono80 border rounded-[2px] h-[90px] w-5/6 p3"
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
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const targetId = id;
  let targetWholeData;
  const snap = await getDoc(doc(dbService, "communityPost", targetId));
  if (snap.exists()) {
    targetWholeData = {
      ...snap.data(),
      writtenDate: convertTimestamp(snap.data().writtenDate),
    };
  } else {
    console.log("No such document");
  }
  if (targetWholeData) {
    targetWholeData = JSON.parse(JSON.stringify(targetWholeData));
  }
  return {
    props: {
      targetWholeData,
      targetId,
    },
  };
}
