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
import { useRouter } from "next/router";
import { async } from "@firebase/util";
import EditorComponent from "../../components/write/textEditor";
export default function DetailPage(props) {
  const [detailPageWholeData, setDetailPageWholeData] = useState({});
  const [comment, setComment] = useState("");
  const [boardComments, setBoardComments] = useState([]);
  const [isPostEdit, setIsPostEdit] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [uid, setUid] = useState("");
  const [targetIndex, setTargetIndex] = useState("");
  const [targetIsEdit, setTargetIsEdit] = useState("");
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
    }
    if (!sessionStorageUser) {
      setUid("geust");
    }
  }, []);
  useEffect(() => {
    setDetailPageWholeData(props.targetWholeData);
    console.log(detailPageWholeData);
    console.log(props.targetId); // uid
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
        writtenDate: data.writtenDate,
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
    const newComment = {
      uid,
      boardId: props.targetId,
      comment,
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

  return (
    <div>
      <div style={{ border: "3px solid blue", width: 300 }}>
        {isPostEdit ? (
          <>
            <input
              type="text"
              value={editPostTitle}
              onChange={(e) => {
                setEditPostTitle(e.target.value);
              }}
            />
            <EditorComponent
              setEditorText={setEditPostContent}
              editorText={editPostContent}
            />
          </>
        ) : (
          <>
            <div>글제목:{detailPageWholeData.title}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: detailPageWholeData.editorText,
              }}
            />
          </>
        )}
        {uid === props.targetWholeData.uid && (
          <div className="flex justify-between">
            <button onClick={() => updatePost(props.targetId)}>
              {isPostEdit ? "완료" : "편집"}
            </button>
            <button onClick={() => deletePost(props.targetId)}>삭제</button>
          </div>
        )}
      </div>
      {uid === "geust" ? (
        <div> 로그인 시 댓글을 작성할 수 있습니다. </div>
      ) : (
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
      )}

      <div style={{ border: "1px solid black" }}>
        <h3>댓글창</h3>
        <div>
          {boardComments?.map((item, index) => {
            return (
              <>
                {targetIndex === index ? (
                  <input
                    key={index}
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
                <div>파이어베이스의 댓글 id: {item.id}</div>
                {/* 댓글작성자 id와 currentUser가 일치할시 수정/삭제 버튼 보이도록 설정*/}
                {uid === item.uid ? (
                  <div>
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
                        // 댓글 id
                        commentEdit(item.id, index);
                      }}
                    >
                      {targetIsEdit === index ? "완료 " : "수정"}
                    </button>
                  </div>
                ) : (
                  ""
                )}
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
  if (snap.exists()) {
    console.log(snap.data());
    targetWholeData = snap.data();
  } else {
    console.log("No such document");
  }
  console.log("targetWholeData:", targetWholeData);
  targetWholeData = JSON.parse(JSON.stringify(targetWholeData));
  console.log(targetWholeData);
  return {
    props: {
      targetWholeData,
      targetId,
    },
  };
}
