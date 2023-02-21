import { useState, useRef, useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { authService, dbService } from "../../config/firebase";
import EditorComponent from "../../components/write/textEditor";
import Image from "next/image";
import { storage } from "../../config/firebase";

import baseImg from "/public/images/test1.png";

const NewCommunityPost = () => {
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imgLoading, setImgLoading] = useState("");

  // 카테고리 추가
  const [selectCategory, setSelectCategory] = useState("");
  const categoryRef = useRef(null);
  const thumbnailRef = useRef(null);

  const user = authService?.currentUser;
  const uid = user?.uid;
  const nickname = user?.displayName;

  const newPost = {
    uid,
    nickname,
    title,
    thumbnail,
    editorText,
    writtenDate: Timestamp.now(),
    category: selectCategory,
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (
      !selectCategory ||
      !imageUpload ||
      !editorText ||
      editorText === "<p><br></p>"
    ) {
      if (!selectCategory) {
        categoryRef.current?.focus();
        return false;
      }
      if (!imageUpload) {
        alert("대표 사진을 선택해주세요!");
        thumbnailRef.current?.focus();
        return false;
      }
      alert("본문 입력은 필수입니다 :)");
      return false;
    }
    await addDoc(collection(dbService, "communityPost"), newPost);
    // setTitle("");
    // setEditorText("");
    // setSelectCategory("");
    alert("커뮤니티 글 업로드!");
    location.href = "/communityPage";
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    setImageUpload(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imgDataUrl = reader.result;
      localStorage.setItem("imgDataUrl", imgDataUrl);
      console.log("imgDataUrl", imgDataUrl);
      setImagePreview(imgDataUrl);
      addImageFirebase(uid);
    };
  };

  const addImageFirebase = async (uid) => {
    if (imageUpload === null) return;
    // let randomID = Date.now();
    const imgRef = ref(storage, `communityThumbnail/${uid}`);
    const imgDataUrl = localStorage.getItem("imgDataUrl");
    let downloadUrl;

    if (imgDataUrl) {
      console.log("imgDataUrl", imgDataUrl);
      setImgLoading("loading");
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      alert("썸네일 업로드 완료!");
      setImgLoading("default");
      downloadUrl = await getDownloadURL(response.ref);
      console.log(downloadUrl);
      setThumbnail(downloadUrl);
    }
  };

  return (
    <div className="w-[1180px] h-full m-auto flex flex-col my-[74px]">
      <p className="w-full text-4xl font-bold pb-6 border-b-2 border-brand100">
        커뮤니티 글쓰기
      </p>
      <form onSubmit={handleOnSubmit} className="flex flex-col w-full ">
        <div className="w-52 h-11 flex mt-5">
          <select
            onChange={(event) => {
              setSelectCategory(event.target.value);
            }}
            ref={categoryRef}
            className="rounded-sm p-3 h-12 border border-mono60 text-mono80 text-input "
          >
            <option value="none">카테고리 선택를 선택하세요.</option>
            <option value="요리">요리</option>
            <option value="애니">애니</option>
            <option value="잡담">잡담</option>
          </select>
        </div>
        <input
          className="w-full h-12 rounded-sm border border-mono60 p-3 my-6 text-input"
          type="text"
          onChange={handleChangeTitle}
          value={title}
          required
          placeholder="제목을 입력해주세요."
        />
        <EditorComponent
          editorText={editorText}
          setEditorText={setEditorText}
        />
        <div className="w-full h-[215px] bg-mono40 border-x border-b border-mono60 pt-7 px-4">
          {imgLoading == "loading" && (
            <div
              style={{
                position: "absolute",
                top: "35%",
                left: "35%",
                width: "500px",
                height: "300px",
                backgroundColor: "#FB4646",
                zIndex: "30",
                textAlign: "center",
              }}
            >
              사진을 서버에 열심히 로딩하고 있어요🥺
            </div>
          )}
          <b>📸등록된 대표 이미지</b>
          <input
            ref={thumbnailRef}
            name="thumbnail"
            id="picture"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="float-right w-[90px]"
          />
          <Image
            src={imagePreview}
            loader={({ src }) => src}
            priority={true}
            width={120}
            height={100}
            alt="프리뷰"
            className="border border-mono60 mt-5 "
          />
        </div>
        <div className="flex justify-end">
          <button
            className="w-44 h-11 mt-24 text-white bg-brand100 font-medium"
            type="submit"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCommunityPost;
