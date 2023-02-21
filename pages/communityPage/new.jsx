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
    <div className="px-4 py-8 bg-slate-400">
      <span>글쓰기</span>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col w-full items-center justify-center"
      >
        <input
          className="w-96 h-10 mb-4"
          type="text"
          onChange={handleChangeTitle}
          value={title}
          required
        />
        <select
          onChange={(event) => {
            setSelectCategory(event.target.value);
          }}
          ref={categoryRef}
          className="focus:ring-2 focus:outline-none ring-offset-2 ring-white  ring-offset-orange-400"
        >
          <option value="none">=== 카테고리 선택 ===</option>
          <option value="요리">요리</option>
          <option value="애니">애니</option>
          <option value="잡담">잡담</option>
        </select>
        {imgLoading == "loading" && (
          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              backgroundColor: "white",
              border: "3px solid black",
              zIndex: "3",
              textAlign: "center",
              paddingLeft: "100px",
            }}
          >
            사진을 서버에 열심히 로딩하고 있어요 🥺 <br />
            잠시만 기다려주세요 !!!!
          </div>
        )}
        <b>📸 대표 사진을 선택해주세요 </b>

        <input
          ref={thumbnailRef}
          name="thumbnail"
          id="picture"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <Image
          src={imagePreview}
          loader={({ src }) => src}
          priority={true}
          width={100}
          height={100}
          alt="프리뷰"
        />
        <EditorComponent
          editorText={editorText}
          setEditorText={setEditorText}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default NewCommunityPost;
