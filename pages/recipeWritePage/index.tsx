import { searchMovieTitle } from "@/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import EditorComponent from "@/components/write/TextEditor";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "../../config/firebase";
import baseImg from "/public/images/test1.png";
import { authService } from "@/config/firebase";

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
    const [displayStatus, setDisplayStatus] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [editorText, setEditorText] = useState("");
    let currentUser: any;
    const [uid, setUid] = useState("");
    const movieTitleRef = useRef<HTMLInputElement>(null);
    const foodTitleRef = useRef<HTMLInputElement>(null);
    const ingredientRef = useRef<HTMLInputElement>(null);
    const cookTimeRef = useRef<HTMLSelectElement>(null);
    const foodCategoryRef = useRef<HTMLSelectElement>(null);
    const thumbnailRef = useRef<HTMLInputElement>(null);
    const displayStatusRef = useRef<HTMLSelectElement>(null);

    const { data, refetch } = useQuery(["tmdb"], () => {
        return searchMovieTitle(searchTitle);
    });

    if (authService.currentUser) {
        currentUser = authService.currentUser;
    }

    useEffect(() => {
        setUid(currentUser?.uid);
        console.log("uid:", uid);
    }, [currentUser]);

    useEffect(() => {
        if (searchTitle) {
            refetch();
            setTargetTitle("");
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
        console.log("영화제목", targetTitle);
        console.log("음식명", foodTitle);
        console.log("재료명", ingredient);
        console.log("소요시간", selectCookTime);
        console.log("음식종류", foodCategory);
        console.log("게시물 공개여부", displayStatus);
        console.log("대표사진 url", thumbnail);
        console.log("텍스트 에디터 내용", editorText);
        console.log("uid", uid);

        const newRecipe = {
            uid, // auth.currentUser에 있는 id
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
        if (
            !targetTitle ||
            !foodTitle ||
            !ingredient ||
            !selectCookTime ||
            !foodCategory ||
            !displayStatus ||
            !thumbnail ||
            !editorText ||
            editorText === "<p><br></p>"
        ) {
            if (!targetTitle) {
                alert("영화 제목을 선택해주세요!");
                movieTitleRef.current?.focus();
                return false;
            }
            if (!foodTitle) {
                alert("음식명을 작성해주세요!");
                foodTitleRef.current?.focus();
                return false;
            }
            if (!ingredient) {
                alert("재료명을 작성해주세요!");
                // ingredientRef.current?
                ingredientRef.current?.focus();
                return false;
            }
            if (!selectCookTime) {
                alert("조리 시간을 작성해주세요!");
                cookTimeRef.current?.focus();
                return false;
            }
            if (!foodCategory) {
                alert("음식 종류를 선택해주세요!");
                foodCategoryRef.current?.focus();
                return false;
            }
            if (!thumbnail) {
                alert("대표 사진을 선택해주세요!");
                thumbnailRef.current?.focus();
                return false;
            }
            if (!displayStatus) {
                alert("게시물 공개여부를 선택해주세요!");
                displayStatusRef.current?.focus();
                return false;
            }
            alert("게시글 본문이 채워지지 않았어요 😥");
            return false;
        }
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
                <br />
                <h2>📢 페이지 입력창을 모두 작성해주세요 📢</h2>
                <br />
                <br />

                <form onSubmit={postNewRecipe}>
                    <b> 영화 제목검색 : </b>
                    <input
                        ref={movieTitleRef}
                        name="targetTitle"
                        type="text"
                        onChange={(event) =>
                            inputChangeSetFunc(event, setSeachTitle)
                        }
                        placeholder=" 원하는 제목을 검색하세요!"
                        style={{ border: "1px solid black", width: "210px" }}
                    />
                    <select
                        style={{ border: "1px solid black" }}
                        onChange={(event) => {
                            selectChangeSetFunc(event, setTargetTitle);
                        }}
                    >
                        {titleArr?.map((item, index) => (
                            <option value={item.title} key={index}>
                                {item.title}
                            </option>
                        ))}
                    </select>

                    <div>
                        <b> 선택한 영화제목 👉 </b>
                        {targetTitle}
                    </div>
                    <b> 음식명 : </b>
                    <input
                        ref={foodTitleRef}
                        name="footTitle"
                        type="text"
                        style={{ border: "1px solid black" }}
                        onChange={(event) =>
                            inputChangeSetFunc(event, setFoodTitle)
                        }
                    />
                    <br />
                    <b> 재료 :</b>
                    <input
                        type="text"
                        ref={ingredientRef}
                        name="ingredient"
                        style={{ border: "1px solid black" }}
                        onChange={(event) =>
                            inputChangeSetFunc(event, setIngredient)
                        }
                    />
                    <br />
                    <b> 소요시간 </b>
                    <select
                        ref={cookTimeRef}
                        onChange={(event) => {
                            selectChangeSetFunc(event, setSelectCookTime);
                        }}
                        style={{ border: "1px solid black" }}
                    >
                        <option value="none"> === 소요시간 선택 === </option>
                        <option value="15분이하">15분이하</option>
                        <option value="30분이하">30분이하</option>
                        <option value="1시간이하">1시간이하</option>
                        <option value="1시간이상">1시간이상</option>
                    </select>
                    <br />
                    <b>클릭한 요리시간 👉 {selectCookTime}</b>
                    <br />
                    <b> 음식 종류 : </b>
                    <select
                        ref={foodCategoryRef}
                        onChange={(event) => {
                            selectChangeSetFunc(event, setFoodCategory);
                        }}
                        style={{ border: "1px solid black" }}
                    >
                        <option value="none"> === 음식 종류 선택 === </option>
                        <option value="국&탕&찌개">국/탕/찌개</option>
                        <option value="구이&볶음&찜">구이/볶음/찜</option>
                        <option value="튀김류">튀김류</option>
                        <option value="베이커리&디저트">베이커리/디저트</option>
                        <option value="음료&주류">음료/주류</option>
                        <option value="밥&도시락&면">밥/도시락/면</option>
                        <option value="식단&건강관리">식단/건강관리</option>
                    </select>
                    <br />
                    <b>클릭한 음식 종류 : {foodCategory}</b>
                    <br />
                    <b>📸 대표 사진을 선택해주세요! </b>
                    <input
                        ref={thumbnailRef}
                        name="thumbnail"
                        onChange={(event) => {
                            onFileChange(event);
                        }}
                        type="file"
                        accept="images/*"
                    />
                    {imagePreview ? (
                        <Image
                            src={imagePreview}
                            width={100}
                            height={100}
                            alt="대표 이미지가 없습니다."
                        />
                    ) : (
                        <Image
                            src={baseImg}
                            width={100}
                            height={100}
                            alt="대표 이미지가 없습니다."
                        />
                    )}
                    <b>게시물 공개여부 </b>
                    <select
                        ref={displayStatusRef}
                        style={{ border: "1px solid black" }}
                        onChange={(event) => {
                            selectChangeSetFunc(event, setDisplayStatus);
                        }}
                    >
                        <option value="none"> === 공개 여부 === </option>
                        <option value="전체 공개">전체 공개</option>
                        <option value="회원 공개">회원 공개</option>
                    </select>
                    <div>공개여부 👉 {displayStatus}</div>
                    <b>게시글 본문</b>
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
