import { useState, useRef, useEffect, ChangeEvent } from "react";
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
import Image, { StaticImageData } from "next/image";
import { storage } from "../../config/firebase";
import Seo from "../../components/layout/Seo";
import { toastAlert } from "@/components/toastify/Alert";

const NewCommunityPost = () => {
  const [editorText, setEditorText] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  // const [imagePreview, setImagePreview] = useState("");
  const [imgPreview, setImgPreview] = useState<
    string | ArrayBuffer | null | StaticImageData
  >("");

  const [imageUpload, setImageUpload] = useState<
    File | Blob | ArrayBuffer | Uint8Array
  >();
  const [imgLoading, setImgLoading] = useState("");

  // 카테고리 추가
  const [selectCategory, setSelectCategory] = useState("");
  const categoryRef = useRef<HTMLSelectElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const user = authService?.currentUser;
  const uid = user?.uid;
  const nickname = user?.displayName;

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.readAsDataURL(file as unknown as Blob);
    reader.onload = () => {
      setImageUpload(file);
      const selectedImgUrl = reader.result;
      localStorage.setItem("selectedImgUrl", selectedImgUrl as string);
      setImgPreview(selectedImgUrl);
      handleUpdateProfile(file);
    };
  };

  const handleUpdateProfile = async (file: any) => {
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

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //-----------------------------------
    const docRef = doc(dbService, "user", uid as unknown as string);
    const docSnap = await getDoc(docRef);
    let writterProfileImg;
    if (docSnap.exists()) {
      const writterData = docSnap.data();
      if (writterData) {
        writterProfileImg = writterData.userImg;
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

    if (!selectCategory || !editorText || editorText === "<p><br></p>") {
      if (!selectCategory) {
        categoryRef.current?.focus();
        return false;
      }
      toastAlert("본문 입력은 필수입니다.");
      return false;
    }

    await addDoc(collection(dbService, "communityPost"), newPost);
    toastAlert("업로드 완료");
    location.href = "/community";
  };
  return (
    <div className="mt-10 w-full h-full max-w-[73.75rem] flex flex-col items-center pt-2 mx-auto sm:p-10 p-7">
      <Seo title="커뮤니티 글쓰기" />
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
        <div className="w-full h-[32rem] mb-11">
          <EditorComponent
            editorText={editorText}
            setEditorText={setEditorText}
          />
        </div>
        <div className="mt-6 sm:mt-0 w-full h-[10.625rem] bg-mono40 border-x border-b border-mono60  px-4">
          {imgLoading == "loading" && (
            <div className="flex items-center justify-center">
              <div className="text-center absolute rounded-lg flex bg-brand100 w-[31.25rem] h-[12.5rem]">
                <div className="text-xl text-white m-auto">
                  사진을 서버에 열심히 로딩하고 있어요 <br />
                  잠시만 기다려주세요 !!!!
                </div>
              </div>
            </div>
          )}

          <div className="mt-[.75rem] float-right flex items-stretch">
            <div className="mt-2 text-mono80 sm:text-[1rem] text-[.625rem]">
              대표 이미지 별도 등록
            </div>
            <label>
              <div className="mt-1 text-[.625rem] w-[3.125rem] h-[1.25rem] rounded-[.1875rem] border  border-mono60 ml-[.4375rem] sm:text-[1rem] text-center hover:cursor-pointer sm:w-[6.25rem] sm:h-[2.1875rem] bg-mono40 text-mono100">
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
                className="float-right w-[5.625rem] hidden"
              />
            </label>
          </div>
          <div className="text-[.625rem] sm:ml-[1rem] pt-[1.25rem] text-mono100 sm:text-[1rem]">
            등록된 대표 이미지
          </div>

          <div className="w-[30%] h-[5rem] sm:w-[8.75rem] sm:h-[6.0625rem] overflow-hidden relative border border-mono60 mt-5 ">
            {imgPreview ? (
              <Image
                src={imgPreview as unknown as string}
                loader={({ src }) => src}
                priority={true}
                fill
                alt="프리뷰"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                unoptimized
              />
            ) : (
              <Image
                src={defaultImg}
                loader={({ src }) => src}
                priority={true}
                fill
                alt="프리뷰"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                unoptimized
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="sm:w-44 sm:h-11 sm:mt-24 mt-2 w-1/5 text-white bg-brand100 "
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
