import { searchMovieTitle } from "@/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import EditorComponent from "@/components/write/TextEditor";
import { collection, doc, addDoc } from "firebase/firestore";
import { dbService } from "../../config/firebase";

interface TitleType {
  title: string;
}

const RecipeWritePage = () => {
  const [searchTitle, setSeachTitle] = useState("");
  const [titleArr, setTitleArr] = useState<TitleType[]>([]);
  const [targetTitle, setTargetTitle] = useState("");
  const [foodTitle, setFoodTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [selectCookTime, setSelectCookTime] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [displayStatus, setDisplayStatus] = useState("전체 공개");
  const [imagePreview, setImagePreview] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [editorText, setEditorText] = useState("");

  const { data, refetch } = useQuery(["tmdb"], () => {
    return searchMovieTitle(searchTitle);
  });

  useEffect(() => {
    if (searchTitle) {
      refetch();
      // 다시 input창을 지우면, 클릭한 영화제목에서 사라지도록
      setTargetTitle("");
      // input창을 지우면 데이터도 다시 없어지도록
    }
    setTitleArr([]);
  }, [refetch, searchTitle]);

  useEffect(() => {
    if (data) {
      setTitleArr(data.results);
    }
  }, [data]);

  const inputChangeSetFunc = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: any
  ) => {
    setFunction(event.target.value);
  };

  const selectChangeSetFunc = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFunction: any
  ) => {
    console.log(event.target.value);
    setFunction(event.target.value);
  };

  const postNewRecipe = async (event: any) => {
    event.preventDefault();
    alert("나 작동하니");

    console.log("영화제목", targetTitle);
    console.log("음식명", foodTitle);
    console.log("재료명", ingredient);
    console.log("소요시간", selectCookTime);
    console.log("음식종류", foodCategory);
    console.log("게시물 공개여부", displayStatus);
    console.log("대표사진 url", thumbnail);
    console.log("텍스트 에디터 내용", editorText);

    const newRecipe = {
      uid: "auth의 currentUser", // auth.currentUser에 있는 id
      animationTitle: targetTitle,
      foodTitle,
      ingredient,
      cookingTime: selectCookTime,
      foodCategory: foodCategory,
      displayStatus,
      thumbnail,
      createdAt: Date.now(),
      content: editorText,
    };
    console.log("newRecipe", newRecipe);
    await addDoc(collection(dbService, "recipe"), newRecipe);
    alert("레시피 저장 성공!");
  };

  const onFileChange = (event: any) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent: any) => {
      const imgDataUrl: any = finishedEvent.currentTarget.result;
      localStorage.setItem("imgDataUrl", imgDataUrl);
      console.log("imgDataUrl", imgDataUrl);
      setImagePreview(imgDataUrl);
      addImageFirebase();
    };
  };

  const addImageFirebase = async () => {
    let randomID = Date.now();
    const imgRef = ref(storage, `newRecipeCoverPhoto${randomID}`);
    const imgDataUrl = localStorage.getItem("imgDataUrl");
    let downloadUrl: any;

    if (imgDataUrl) {
      console.log("imgDataUrl", imgDataUrl);
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
      console.log(downloadUrl);
      setThumbnail(downloadUrl);
    }
  };

  return (
    <div>
      <div style={{ border: "1px solid blue" }}>
        <h3>레시피 글쓰기 페이지</h3>
        <form onSubmit={postNewRecipe}>
          <b>영화 제목 : </b>
          <input
            type="text"
            onChange={(event) => inputChangeSetFunc(event, setSeachTitle)}
            placeholder="영화 제목 입력"
            style={{ border: "1px solid black" }}
          />
          <select
            style={{ border: "1px solid black" }}
            onChange={(event) => {
              selectChangeSetFunc(event, setTargetTitle);
            }}
          >
            {titleArr?.map((item) => (
              <option value={item.title}>{item.title}</option>
            ))}
            <br />
          </select>

          <br />
          <div>
            <b>클릭한 영화제목(targetTitle):</b>
            {targetTitle}
          </div>
          <b> 음식명 :</b>
          <input
            type="text"
            style={{ border: "1px solid black" }}
            onChange={(event) => inputChangeSetFunc(event, setFoodTitle)}
          />
          <br />
          <b> 재료 :</b>
          <input
            type="text"
            style={{ border: "1px solid black" }}
            onChange={(event) => inputChangeSetFunc(event, setIngredient)}
          />
          <br />
          <b> 소요시간 </b>
          <select
            onChange={(event) => {
              selectChangeSetFunc(event, setSelectCookTime);
            }}
            style={{ border: "1px solid black" }}
          >
            <option value="15분 이하">15분 이하</option>
            <option value="30분 이하">30분 이하</option>
            <option value="1시간 이하">1시간 이하</option>
            <option value="1시간 이상">1시간 이상</option>
          </select>
          <div>클릭한 요리시간 : {selectCookTime}</div>
          <b>음식 종류</b>
          <select
            onChange={(event) => {
              selectChangeSetFunc(event, setFoodCategory);
            }}
            style={{ border: "1px solid black" }}
          >
            <option value="국/탕/찌개">국/탕/찌개</option>
            <option value="구이/볶음/찜">구이/볶음/찜</option>
            <option value="튀김류">튀김류</option>
            <option value="베이커리/디저트">베이커리/디저트</option>
            <option value="음료/주류">음료/주류</option>
            <option value="밥/도시락/면">밥/도시락/면</option>
            <option value="식단/건강관리">식단/건강관리</option>
          </select>
          <div>클릭한 음식 종류 : {foodCategory}</div>
          <b>대표 사진 : </b>
          <input
            onChange={(event) => {
              onFileChange(event);
            }}
            type="file"
            accept="images/*"
          />
          <Image
            style={{ border: "1px solid black" }}
            src={imagePreview}
            alt="선택된 대표사진이 없습니다"
            width={100}
            height={100}
          />
          <b>게시물 공개여부 </b>
          <select
            style={{ border: "1px solid black" }}
            onChange={(event) => {
              selectChangeSetFunc(event, setDisplayStatus);
            }}
          >
            <option value="전체 공개">전체 공개</option>
            <option value="회원 공개">회원 공개</option>
          </select>
          <div>공개여부:{displayStatus}</div>
          <EditorComponent
            editorText={editorText}
            setEditorText={setEditorText}
          />
          <button
            type="submit"
            style={{
              border: "1px solid black",
              background: "grey",
              color: "white",
            }}
          >
            글 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeWritePage;
