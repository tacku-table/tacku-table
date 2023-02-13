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
import { dbService, storage } from "@/config/firebase";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

export default function DetailPage(props) {
  const [detailPageWholeData, setDetailPageWholeData] = useState({});
  const [comment, setComment] = useState("");
  const [boardComments, setBoardComments] = useState([]);
  let convertBoardComments;
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState("");

  //input을 입력할때마다 Detail페이지가 랜더링이 되는데??
  console.log("props", props);
  console.log("post", props.targetWholeData);
  useEffect(() => {
    setDetailPageWholeData(props.targetWholeData);
    console.log(detailPageWholeData);
    console.log(props.targetId);
    //배열 벗기자 (...)기능
    // convertBoardComments = { ...props.commentWholeData };
    convertBoardComments = props.commentWholeData;
    console.log("convertBoardComments:", convertBoardComments);
    setBoardComments(convertBoardComments);
    convertBoardComments.map((item) => {
      console.log(item.comment);
    });
  }, []);

  useEffect(() => {
    setBoardComments(convertBoardComments);
  }, [convertBoardComments]);

  const addComment = async (event) => {
    event.preventDefault();
    const newComment = {
      comment,
      boardId: props.targetId,
    };
    await addDoc(collection(dbService, "comments"), newComment);
    alert("댓글 저장 성공!");
  };

  const deleteComment = async (commentId) => {
    console.log("댓글 id?", commentId);
    const userConfirm = window.confirm("해당 댓글을 정말 삭제하시겠습니까?");
    if (userConfirm) {
      try {
        await deleteDoc(doc(dbService, "comments", commentId));
        alert("댓글 삭제 완료!");
      } catch (error) {
        alert(error);
      }
    }
  };

  const commentEdit = async (id) => {
    console.log(id);
    setIsEdit(false);
    const postRef = doc(dbService, "comments", id);

    if (editComment) {
      await updateDoc(postRef, {
        comment: editComment,
      });
      alert("댓글 수정 완료!");
    }
    setIsEdit(true);
  };

  return (
    <div>
      <div style={{ border: "3px solid blue", width: 300 }}>
        <div>글id:{props.targetId}</div>
        <div>글제목:{detailPageWholeData.title}</div>
        <h3>텍스트 에디터 내용</h3>
        <div
          dangerouslySetInnerHTML={{ __html: detailPageWholeData.editorText }}
        />
      </div>

      <div>
        <input
          type="text"
          style={{ border: "1px solid black" }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          type="button"
          style={{ border: "1px solid black" }}
          onClick={addComment}
        >
          댓글 추가하기
        </button>
      </div>
      <div style={{ border: "1px solid black" }}>
        <h3>댓글창</h3>
        <div>
          {boardComments?.map((item) => {
            return (
              <>
                {isEdit ? (
                  <input
                    type="text"
                    style={{ border: "1px solid black" }}
                    value={editComment}
                    onChange={(e) => {
                      setEditComment(e.target.value);
                    }}
                  />
                ) : (
                  <p>{item.comment}</p>
                )}
                <div>댓글id: {item.id}</div>
                <button
                  type="button"
                  style={{ border: "1px solid black" }}
                  onClick={() => {
                    deleteComment(item.id);
                  }}
                >
                  삭제
                </button>
                <button
                  type="button"
                  style={{ border: "1px solid black" }}
                  onClick={() => {
                    commentEdit(item.id);
                  }}
                >
                  {isEdit ? "완료 " : "수정"}
                </button>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("context는?", context);
  const { params } = context;
  const { id } = params;
  console.log("id는?", id);
  const targetId = id;
  let targetWholeData;
  let commentWholeData = [];

  const snap = await getDoc(doc(dbService, "communityPost", targetId));

  //-----------------댓글---------------
  const q = query(
    collection(dbService, "comments"),
    where("boardId", "==", targetId)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const comments = {
      id: doc.id,
      ...doc.data(),
    };
    console.log(doc.id, " => ", doc.data());
    // commentWholeData = doc.data();
    commentWholeData.push(comments);
  });
  console.log("commentWholeData:", commentWholeData);

  //-----------------------------------

  if (snap.exists()) {
    console.log(snap.data());
    targetWholeData = snap.data();
  } else {
    console.log("No such document");
  }
  console.log("targetWholeData:", targetWholeData);

  //해결한 코드
  // 제이슨 전달할때 객체안의 객체 넣지말라고 오류났었음
  targetWholeData = JSON.parse(JSON.stringify(targetWholeData));
  console.log(targetWholeData);

  return {
    props: {
      // response,
      targetWholeData,
      targetId,
      commentWholeData,
    },
  };
}
