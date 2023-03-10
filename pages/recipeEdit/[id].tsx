import { dbService } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { searchMovieTitle } from "@/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import EditorComponent from "@/components/write/TextEditor";
import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Seo from "../../components/layout/Seo";

interface TitleType {
  title: string;
}

const RecipeEditPage = ({
  targetWholeData,
  postId,
}: {
  targetWholeData: targetWholeDataType;
  postId: string;
}) => {
  const [searchTitle, setSeachTitle] = useState(targetWholeData.animationTitle);
  const [titleArr, setTitleArr] = useState<TitleType[]>([]);
  const [targetTitle, setTargetTitle] = useState(
    targetWholeData.animationTitle
  );
  const [foodTitle, setFoodTitle] = useState(targetWholeData.foodTitle);
  const [ingredient, setIngredient] = useState(targetWholeData.ingredient);
  const [selectCookTime, setSelectCookTime] = useState(
    targetWholeData.cookingTime
  );
  const [foodCategory, setFoodCategory] = useState(
    targetWholeData.foodCategory
  );
  const [displayStatus, setDisplayStatus] = useState("");
  const [imagePreview, setImagePreview] = useState(targetWholeData.thumbnail);
  const [thumbnail, setThumbnail] = useState(targetWholeData.thumbnail);
  const [editorText, setEditorText] = useState(targetWholeData.content);
  const [uid, setUid] = useState("");
  const movieTitleRef = useRef<HTMLInputElement>(null);
  const foodTitleRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const cookTimeRef = useRef<HTMLSelectElement>(null);
  const foodCategoryRef = useRef<HTMLSelectElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [storageCurrentUser, setStorageCurrentUser] = useState<parseUserType>(
    {}
  );
  const [originImgThumbNail, setOriginImgThumbNail] = useState("");
  const [imgLoading, setImgLoading] = useState("default");

  useEffect(() => {
    const user = sessionStorage.getItem("User") || "";
    const parseUser = JSON.parse(user);
    setStorageCurrentUser(parseUser);
    setOriginImgThumbNail(targetWholeData?.thumbnail);
  }, []);

  const { data, refetch } = useQuery(["tmdb"], () => {
    return searchMovieTitle(searchTitle);
  });

  useEffect(() => {
    if (searchTitle) {
      refetch();
    }
    setTitleArr([]);
  }, [refetch, searchTitle]);

  useEffect(() => {
    if (data) {
      setTitleArr(data.results);
    }
  }, [data]);

  const toastAlert = (alertText: string) => {
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

  const inputChangeSetFunc = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  const selectChangeSetFunc = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunction(event.target.value);
  };

  const editPost = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    const newEditRecipe = {
      uid: storageCurrentUser?.uid,
      writerNickName: storageCurrentUser?.displayName, // auth.currentUser에 있는 id
      animationTitle: targetTitle,
      foodTitle,
      ingredient,
      cookingTime: selectCookTime,
      foodCategory: foodCategory,
      displayStatus,
      thumbnail,
      createdAt: Date.now(),
      content: editorText,
      viewCount: 0,
      bookmarkCount: 0,
    };
    if (
      !targetTitle ||
      !foodTitle ||
      !ingredient ||
      !selectCookTime ||
      !foodCategory ||
      foodCategory == "none" ||
      selectCookTime == "none" ||
      !displayStatus ||
      !thumbnail ||
      !editorText ||
      !displayStatus ||
      editorText === "<p><br></p>"
    ) {
      if (!targetTitle) {
        toastAlert("🥺 영화 제목을 선택해주세요 🥺");
        movieTitleRef.current?.focus();
        return false;
      }
      if (!foodTitle) {
        toastAlert("🥺 레시피 제목을 깜빡하셨어요 🥺");
        foodTitleRef.current?.focus();
        return false;
      }
      if (!foodCategory || foodCategory == "none") {
        toastAlert("🥺 음식 종류를 선택해주세요! 🥺");
        foodCategoryRef.current?.focus();
        return false;
      }

      if (!selectCookTime || selectCookTime == "none") {
        toastAlert("🥺 소요 시간을 작성해주세요 🥺");
        cookTimeRef.current?.focus();
        return false;
      }

      if (!ingredient) {
        toastAlert("🥺 재료명을 작성해주세요 🥺");
        ingredientRef.current?.focus();
        return false;
      }

      if (!editorText) {
        toastAlert("🥺 본문이 채워지지 않았어요!🥺");
        return false;
      }

      if (!thumbnail) {
        toastAlert("🥺 대표 사진을 선택해주세요! 🥺");
        thumbnailRef.current?.focus();
        return false;
      }
      if (!displayStatus) {
        toastAlert("🥺 게시글 공개여부를 체크해주세요! 🥺");
        return false;
      }
      alert("게시글 본문이 채워지지 않았어요 😥");
      return false;
    }

    //---------update하는 함수-------------------
    const docRef = doc(dbService, "recipe", postId);
    await updateDoc(docRef, {
      writerNickName: storageCurrentUser?.displayName, // auth.currentUser에 있는 id
      animationTitle: targetTitle,
      foodTitle,
      ingredient,
      cookingTime: selectCookTime,
      foodCategory: foodCategory,
      displayStatus,
      thumbnail,
      createdAt: Date.now(),
      content: editorText,
    });

    //---------------------------------------
    toastAlert("게시물 수정이 완료되었습니다.");
    setTimeout(() => {
      location.href = "/search";
    }, 1200);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const theFile = (target.files as FileList)[0];
    const reader: FileReader = new FileReader();
    if (theFile && theFile.type.match("image.*")) {
      reader.readAsDataURL(theFile);
    }
    reader.onloadend = (finishedEvent: ProgressEvent) => {
      const imgDataUrl = reader.result as string;
      localStorage.setItem("imgDataUrl", imgDataUrl);
      setImagePreview(imgDataUrl);
      setOriginImgThumbNail(imgDataUrl);
      addImageFirebase();
    };
  };

  const addImageFirebase = async () => {
    let randomID = Date.now();
    const imgRef = ref(storage, `newRecipeCoverPhoto${randomID}`);
    const imgDataUrl = localStorage.getItem("imgDataUrl");
    let downloadUrl: string;

    if (imgDataUrl) {
      setImgLoading("loading");
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
      toastAlert("대표 이미지 업데이트 성공~!");
      await setImgLoading("loaded");
      setThumbnail(downloadUrl);
    }
  };

  return (
    <div className="mt-10 w-full h-full max-w-[1180px] flex flex-col items-center pt-2 mx-auto sm:p-10">
      <Seo title="레시피 수정" />
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="mt-[75px] rounded-md p-7 container max-w-4/5 mx-auto flex justify-center flex-col">
        <h3 className="sm:text-4xl text-2xl font-bold">레시피 수정하기</h3>
        <hr className="mt-[24px] h-px border-[1.5px] border-brand100"></hr>
        <form onSubmit={editPost} className="mt-[40px]">
          <div className="pb-7">
            <b className="text-[21px] font-semibold"> 애니메이션 제목 검색 </b>
            <input
              value={searchTitle}
              className="p-2 sm:ml-[17px] sm:w-[280px] h-[45px] border border-mono60 rounded-[2px] "
              ref={movieTitleRef}
              name="targetTitle"
              type="text"
              onChange={(event) => inputChangeSetFunc(event, setSeachTitle)}
              placeholder="새로운 영화제목을 검색하세요"
            />

            {searchTitle ? (
              <div className="ml-0 sm:ml-[6px] rounded-lg sm:w-[450px]  sm:text-center sm:mt-1">
                <select
                  className="sm:ml-[185px] w-[280px] h-[40px] mt-[16px] border border-mono60 rounded-[2px] text-center"
                  onChange={(event) => {
                    selectChangeSetFunc(event, setTargetTitle);
                  }}
                >
                  <option
                    value="defaultValue"
                    selected
                    style={{ display: "none" }}
                  >
                    🎬 {searchTitle} 로 검색된 영화 선택 🎬
                  </option>
                  {titleArr?.map((item, index) => (
                    <option value={item.title} key={index}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="space-y-3 mt-[20px]">
            <div className="pb-7 flex sm:flex-row flex-col">
              <div className="text-[21px] float-left font-semibold">
                레시피 제목
              </div>
              <input
                className="p-2 lg:w-[580px] sm:w-[280px] md:w-[280px] sm:ml-[97px] text-mono70 h-[45px] border border-mono60 rounded-[2px]"
                value={foodTitle}
                ref={foodTitleRef}
                name="footTitle"
                type="text"
                onChange={(event) => inputChangeSetFunc(event, setFoodTitle)}
              />
            </div>
            <div className="pb-[40px] flex sm:flex-row flex-col">
              <div className="text-[21px] float-left font-semibold">
                음식 종류
              </div>
              <select
                className="p-2 sm:ml-[115px] ml-0 text-mono70 sm:w-[280px] h-[40px] border border-mono60 rounded-[2px]"
                ref={foodCategoryRef}
                onChange={(event) => {
                  selectChangeSetFunc(event, setFoodCategory);
                }}
              >
                <option value="none"> 음식 종류 선택 </option>
                <option value="국&탕&찌개">국/탕/찌개</option>
                <option value="구이&볶음&찜">구이/볶음/찜</option>
                <option value="튀김류">튀김류</option>
                <option value="베이커리&디저트">베이커리/디저트</option>
                <option value="음료&주류">음료/주류</option>
                <option value="밥&도시락&면">밥/도시락/면</option>
                <option value="식단&건강관리">식단/건강관리</option>
              </select>
            </div>
            <div className="pb-[40px]">
              <b className="text-[21px] font-semibold "> 소요시간 </b>
              <select
                className="p-2 sm:ml-[115px] sm:w-[280px] text-mono70 w-full h-[40px] border border-mono60 rounded-[2px]"
                ref={cookTimeRef}
                onChange={(event) => {
                  selectChangeSetFunc(event, setSelectCookTime);
                }}
              >
                <option value="none"> 요리 소요 시간 선택 </option>
                <option value="15분이하">15분이하</option>
                <option value="30분이하">30분이하</option>
                <option value="1시간이하">1시간이하</option>
                <option value="1시간이상">1시간이상</option>
              </select>
            </div>
            <hr className="h-px my-7 border-[1px] border-mono60"></hr>

            <div className="flex items-stretch pt-7 sm:flex-row flex-col">
              <div className="text-[21px] font-semibold">주재료</div>
              <input
                value={ingredient}
                type="text"
                ref={ingredientRef}
                name="ingredient"
                onChange={(event) => inputChangeSetFunc(event, setIngredient)}
                className="pb-[80px] p-2 ml-0 sm:ml-[135px] sm:w-[580px] sm:h-[117px] h-[150px] border border-mono60 rounded-[2px]"
              />
            </div>
          </div>
          <hr className="mt-[40px] border-[1px] border-mono60"></hr>
          <div className="pt-[40px] relative">
            <div className="text-[21px] pb-[40px] font-semibold">
              레시피 작성
            </div>
            <div className="w-full sm:h-[538px] h-[300px]">
              <EditorComponent
                editorText={editorText}
                setEditorText={setEditorText}
              />
            </div>
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

            <div className="bg-mono40 sm:h-[210px] sm:mt-[42px] mt-[70px]">
              <div className="mt-[12px] float-right sm:float-right flex items-stretch">
                <div className="mt-2 text-mono80 text-[16px]">대표 이미지</div>
                <label htmlFor="ex_file">
                  <div className="rounded-[2px] border border-mono60 ml-[20px] text-[16px] text-center pt-1 hover:cursor-pointer w-[100px] h-[35px] bg-mono40 text-mono100">
                    이미지 선택
                  </div>
                </label>
                <input
                  id="ex_file"
                  className="hidden"
                  ref={thumbnailRef}
                  name="thumbnail"
                  onChange={(event) => {
                    onFileChange(event);
                  }}
                  type="file"
                  accept="images/*"
                />
              </div>
              <div className="ml-[16px] pt-[20px] text-mono100 text-[16px]">
                등록된 대표 이미지
              </div>
              <Image
                className="ml-[16px] w-[82px] h-[49px] pt-[16px]"
                loader={() => originImgThumbNail}
                src={originImgThumbNail}
                width={100}
                height={100}
                alt="기존 게시물 대표 섬네일 이미지입니다."
              />
              <div className="ml-[16px] pt-[28px] text-[16px] text-mono100">
                공개 설정
              </div>

              <div className="ml-[16px] flex items-stretch mt-[16px]">
                <div className="flex items-stretch">
                  <input
                    className="accent-brand100"
                    name="samename"
                    type="radio"
                    value="전체 공개"
                    onClick={(event) => {
                      const target = event.target as HTMLInputElement;
                      setDisplayStatus(target.value);
                    }}
                  />

                  <h3 className="ml-2">전체 공개</h3>
                </div>
                <div className="flex items-stretch ml-[32px]">
                  <input
                    className="accent-brand100"
                    name="samename"
                    type="radio"
                    value="회원 공개"
                    onClick={(event) => {
                      const target = event.target as HTMLInputElement;
                      setDisplayStatus(target.value);
                    }}
                  />
                  <h3 className="ml-2">멤버 공개</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[40px] float-right">
            <button
              className="text-white w-[80px] sm:w-[180px] sm:h-[48px] bg-brand100 border border-mono60"
              type="submit"
            >
              등록
            </button>
            <button
              type="button"
              className="ml-[12px] w-[80px] sm:w-[180px] sm:h-[48px] border border-mono60"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeEditPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let targetWholeData;
  const { params } = context;
  const { id } = params as { [key: string]: string };
  const postId = id;

  const snap = await getDoc(doc(dbService, "recipe", postId));
  if (snap.exists()) {
    targetWholeData = snap.data();
  } else {
    console.log("가져올 문서가 없습니다.");
    return { props: {} };
  }

  if (targetWholeData) {
    targetWholeData = JSON.parse(JSON.stringify(targetWholeData));
  }

  return {
    props: {
      targetWholeData: targetWholeData || null,
      postId: postId || null,
    },
  };
};
