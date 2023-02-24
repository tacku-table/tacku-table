import { useState, useRef, useEffect } from "react";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { authService, dbService } from "../../config/firebase";
import EditorComponent from "../../components/write/TextEditor";
import defaultImg from "../../public/images/test1.png";
import Image from "next/image";
import { storage } from "../../config/firebase";

const NewCommunityPost = () => {
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  // const [imagePreview, setImagePreview] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  const [imageUpload, setImageUpload] = useState("");
  const [imgLoading, setImgLoading] = useState("");

  // 카테고리 추가
  const [selectCategory, setSelectCategory] = useState("");
  const categoryRef = useRef(null);
  const thumbnailRef = useRef(null);

  const user = authService?.currentUser;
  const uid = user?.uid;
  const nickname = user?.displayName;

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // const imgDataUrl = reader.result;
  // localStorage.setItem("imgDataUrl", imgDataUrl);
  // console.log("imgDataUrl", imgDataUrl);
  // setImagePreview(imgDataUrl);
  // await addImageFirebase(uid);
  const handleImageFile = (event) => {
    const file = event.target.files?.[0];
    console.log(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUpload(file);
      const selectedImgUrl = reader.result;
      localStorage.setItem("selectedImgUrl", selectedImgUrl);
      setImgPreview(selectedImgUrl);
      console.log("selectedImgUrl", selectedImgUrl);

      handleUpdateProfile(file);
    };
  };

  const handleUpdateProfile = async (file) => {
    const imgFile = file;
    const selectedImgUrl = localStorage.getItem("selectedImgUrl");
    // if (selectedImgUrl === null) return;
    if (selectedImgUrl) {
      setImgLoading("loading");
      let randomID = Date.now();
      const imageRef = ref(storage, `communityThumbnail/${uid}/${randomID}`);
      await uploadBytesResumable(imageRef, imgFile, imgFile.type).then(
        (snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setThumbnail(url);
          });
          setImgLoading("default");
        }
      );
    }
    // const metaData = {
    //   contentType: imageUpload.type,
    // };
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    //-----------------------------------
    const docRef = doc(dbService, "user", uid);
    const docSnap = await getDoc(docRef);
    let writterProfileImg;
    console.log("user", docSnap);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const writterData = docSnap.data();
      if (writterData) {
        writterProfileImg = writterData.userImg;
        console.log("writterProfileImg:", writterProfileImg);
      }
    } else {
      console.log("No such document!");
    }
    //-----------------------------------

    const newPost = {
      uid,
      nickname,
      title,
      thumbnail: thumbnail,
      editorText,
      writtenDate: Timestamp.now(),
      category: selectCategory,
      writterProfileImg,
    };

    if (
      !selectCategory ||
      // !imageUpload ||
      !editorText ||
      editorText === "<p><br></p>"
    ) {
      if (!selectCategory) {
        categoryRef.current?.focus();
        return false;
      }
      alert("본문 입력은 필수입니다");
      return false;
    }

    await addDoc(collection(dbService, "communityPost"), newPost);
    alert("커뮤니티 글 업로드!");
    location.href = "/communityPage";
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
        <div className="w-full h-[512px] mb-11">
          <EditorComponent
            editorText={editorText}
            setEditorText={setEditorText}
          />
        </div>
        <div className="w-full h-[215px] bg-mono40 border-x border-b border-mono60  px-4">
          {imgLoading == "loading" && (
            <div className="flex items-center justify-center">
              <div className="text-center absolute rounded-lg flex bg-brand100 w-[500px] h-[200px]">
                <div className="text-xl text-white m-auto">
                  사진을 서버에 열심히 로딩하고 있어요 <br />
                  잠시만 기다려주세요 !!!!
                </div>
              </div>
            </div>
          )}

          <div className="mt-[12px] float-right flex items-stretch">
            <div className="mt-2 text-mono80 text-[16px]">
              대표 이미지 별도 등록
            </div>
            <label>
              <div className="rounded-[2px] border border-mono60 ml-[20px] text-[16px] text-center pt-1 hover:cursor-pointer w-[100px] h-[35px] bg-mono40 text-mono100">
                이미지 선택
              </div>
              <input
                ref={thumbnailRef}
                name="thumbnail"
                id="picture"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  handleImageFile(event);
                }}
                className="float-right w-[90px] hidden"
              />
            </label>
          </div>
          <div className="ml-[16px] pt-[20px] text-mono100 text-[16px]">
            등록된 대표 이미지
          </div>

          <div className=" w-[140px] h-[97px] overflow-hidden relative border border-mono60 mt-5 ">
            {imgPreview ? (
              <Image
                src={imgPreview}
                loader={({ src }) => src}
                priority={true}
                fill
                alt="프리뷰"
                style={{ objectFit: "cover", objectPosition: "center" }}
                unoptimized
              />
            ) : (
              <Image
                src={defaultImg}
                loader={({ src }) => src}
                priority={true}
                fill
                alt="프리뷰"
                style={{ objectFit: "cover", objectPosition: "center" }}
                unoptimized
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="w-44 h-11 mt-24 text-white bg-brand100 "
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
