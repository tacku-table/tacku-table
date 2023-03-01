import {
  doc,
  getDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "@/config/firebase";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditorComponent from "../../components/write/TextEditor";
import baseImg from "../../public/images/test1.png";
import Image from "next/image";
import { convertTimestamp } from "../../util";
import { authService } from "../../config/firebase";
import useGetUserProfileNickName from "../../hooks/useGetUserProfileNickName";
import Comments from "../../components/community/Comments";

export default function DetailPage(props) {
  const [detailPageWholeData, setDetailPageWholeData] = useState({});
  const [isPostEdit, setIsPostEdit] = useState(false);
  const [uid, setUid] = useState("");
  const [commentWriterNickName, setCommentWriterNickName] = useState("");
  const [commentProfile, setCommentProfile] = useState("");
  const writterUID = props.targetWholeData.uid;

  const { userNickName: writterNickName, userProfileURL: writterProfile } =
    useGetUserProfileNickName(writterUID);

  console.log(
    "useGetUserProfileNickName(writterUID)",
    useGetUserProfileNickName(writterUID)
  );

  const boardId = props.targetId;

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
      if (authService.currentUser) {
        setCommentProfile(authService.currentUser.photoURL);
      }
      setUid(parsingUser?.uid);
      setCommentWriterNickName(parsingUser?.displayName);
    }
    if (!sessionStorageUser) {
      setUid("guest");
    }
  }, []);
  useEffect(() => {
    setDetailPageWholeData(props.targetWholeData);
  }, []);

  // useGetUserProfileNicnName 훅 사용하여 글 작성자 닉네임, 프로필 사진 업데이트------(시작)

  // useGetUserProfileNicnName(writterUID).then((item) => {
  //   console.log("커스텀훅으로 뽑아냄", item.userNickName, item.userProfileURL);
  //   setWritterNickName(item.userNickName);
  //   setWritterProfile(item.userProfileURL);
  // });

  useEffect(() => {
    console.log(
      "writterNickName, writterProfile",
      writterNickName,
      writterProfile
    );
  }, [writterNickName, writterProfile]);

  // useGetUserProfileNicnName 훅 사용하여 글 작성자 닉네임, 프로필 사진 업데이트------(끝)

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
              <div className="flex justify-between items-center">
                <div className="h-[60px] flex">
                  {writterProfile === "null" ? (
                    <Image
                      className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                      src={baseImg}
                      width={780}
                      height={270}
                      alt="대표 이미지가 없습니다."
                    />
                  ) : (
                    <Image
                      src={writterProfile}
                      loader={({ src }) => src}
                      width={100}
                      height={100}
                      alt="writterProfile"
                      className="w-[40px] h-[40px] object-cover object-center float-left m-2"
                    />
                  )}

                  <h3 className="relative top-[15px]">{writterNickName}</h3>
                </div>
                <div className="text-[16px] text-mono80">
                  {detailPageWholeData.writtenDate}
                </div>
              </div>
              <hr class="h-px mt-5 mb-10 bg-mono50 border-[1px] border-mono50"></hr>
              <div className="mt-10 text-center">
                {/* 대표사진 */}
                {detailPageWholeData.thumbnail === "" ? (
                  <Image
                    className="w-[780px] h-[270px] lg:w-5/6 md:w-5/6 mb-10 m-auto"
                    src={baseImg}
                    width={780}
                    height={270}
                    alt="대표 이미지가 없습니다."
                  />
                ) : (
                  <Image
                    src={detailPageWholeData.thumbnail}
                    loader={({ src }) => src}
                    className="lg:w-5/6 md:w-5/6 mb-10 m-auto"
                    width={780}
                    height={270}
                    alt="커뮤썸네일"
                  />
                )}
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
          <Comments boardId={boardId} uid={uid} />
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
