import { useEffect, useState } from "react";
import {
    onSnapshot,
    doc,
    updateDoc,
    getDoc,
    deleteDoc,
} from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Bookmark from "@/components/detail/Bookmark";
import defaultImg from "../../public/images/profile.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function DetailReciptPage(props: any) {
    //레시피 데이터
    const [recipeData, getRecipeData] = useState<any>("");
    //회원 데이터
    const [userData, setUserData] = useState<any>("");
    const [userFireData, setUserFireData] = useState<any>("");
    //조회수
    let [views, setViews] = useState<number>(props.targetWholeData.viewCount);
    const userUid = props.targetWholeData.uid;
    //레시피 데이터 불러오기
    useEffect(() => {
        getRecipeData(props.targetWholeData);
        onSnapshot(doc(dbService, "user", userUid), (snapshot) => {
            setUserFireData(snapshot.data());
        });
    }, []);

    //----------다경 추가---------------(시작)
    const [storageCurrentUser, setStorageCurrentUser]: any = useState({});
    useEffect(() => {
        const user = sessionStorage.getItem("User") || "";
        if (user) {
            const parseUser = JSON.parse(user);
            setStorageCurrentUser(parseUser);
        }
    }, []);
    //----------다경 추가---------------(끝)

    //조회수
    useEffect(() => {
        setViews((views += 1));
        updateDoc(doc(dbService, "recipe", props.postId), {
            viewCount: views,
        });
    }, []);

    useEffect(() => {
        const sessionStorageUser = sessionStorage.getItem("User") || "";
        if (sessionStorageUser) {
            const parsingUser = JSON.parse(sessionStorageUser);
            setUserData(parsingUser?.uid);
        }
        if (!sessionStorageUser) {
            setUserData("geust");
        }
    }, []);
    //----------------다경 추가한 부분(시작)--------------------
    const deleteTargetRecipe = async () => {
        const userConfirm = window.confirm("해당 글을 삭제하시겠습니까?");
        console.log("props.postId", props.postId);
        const targetBoardId = props.postId;
        if (userConfirm) {
            try {
                await deleteDoc(doc(dbService, "recipe", targetBoardId));
                alert("게시물이 삭제되었습니다.");
                location.href = "/mainPage";
            } catch (error) {
                console.log("error: ", error);
            }
        }
    };
    //----------------다경 추가한 부분(끝)--------------------

    return (
        <div className="w-full h-full flex flex-col items-center bg-mono40 ">
            <div className=" w-[1180px] my-4 bg-white pb-[131px] pt-[52px] px-[200px]">
                <div className="bg-slate-100 w-full h-[440px] overflow-hidden relative">
                    <Image
                        src={`${recipeData.thumbnail}`}
                        alt="thumbnail"
                        className="image-detail"
                        fill
                        unoptimized
                        style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                </div>
                <div className="flex-col my-5">
                    <div className="flex justify-between my-5">
                        <p className="text-2xl font-semibold">
                            {recipeData.foodTitle}
                        </p>
                        <p className="w-6 h-6">
                            <Bookmark
                                postId={props.postId}
                                recipeData={recipeData}
                                userData={userData}
                            />
                        </p>
                    </div>
                    <div className="flex items-center">
                        <span className="float-left mr-2 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                className="w-4 h-4 text-red100"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                        <p>{recipeData.cookingTime}</p>
                    </div>
                    <div className="flex justify-between border-b-2 border-border-500 pb-8 my-5">
                        <p> {recipeData.animationTitle}</p>
                        <p>{recipeData.foodCategory}</p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                            {userFireData.userImg === "null" ? (
                                <Image
                                    src={defaultImg}
                                    width={50}
                                    height={50}
                                    alt="default_img"
                                    className="rounded-md"
                                    unoptimized
                                />
                            ) : (
                                <Image
                                    src={`${userFireData.userImg}`}
                                    priority={true}
                                    width={50}
                                    height={50}
                                    alt="user_img"
                                    className="rounded-md"
                                    unoptimized
                                />
                            )}
                            <p className="pl-5 font-semibold">
                                {userFireData.userNickname}
                            </p>
                        </div>
                        {/* 수정/ 삭제 */}
                        {props.targetWholeData.uid == storageCurrentUser.uid ? (
                            <div className="flex">
                                <div className="recipepage-edit-button pt-1">
                                    <Link
                                        href={`/recipeEditPage/${props.postId}`}
                                    >
                                        수정하기
                                    </Link>
                                </div>
                                <button
                                    className="recipepage-del-button  ml-2"
                                    type="button"
                                    onClick={deleteTargetRecipe}
                                >
                                    삭제하기
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div>
                    <p className=" border-b-2 border-border-500 pb-3 mt-12 font-semibold">
                        재료
                    </p>
                    <p className="mt-8"> {recipeData.ingredient}</p>
                </div>
                <div className=" border-b-2 border-border-500 pb-3 mt-16 mb-8 font-semibold">
                    <p>레시피</p>
                </div>
                <div className="w-4/5 m-auto text-center items-center">
                    <div
                        dangerouslySetInnerHTML={{ __html: recipeData.content }}
                    />
                </div>
                <div className=" flex justify-between items-center border-b-2 border-border-500 pb-4 mt-11 mb-8 ">
                    <div>조회수 : {views}</div>
                    <button className="border-2 border-border-500 px-4 py-2 ">
                        맨위로
                    </button>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: any = async (context: any) => {
    let targetWholeData;
    const { params } = context;
    const { id } = params;
    //페이지 해당 id
    const postId = id;
    const snap = await getDoc(doc(dbService, "recipe", postId));
    if (snap.exists()) {
        targetWholeData = snap.data();
    } else {
        console.log("No such document");
    }

    //해결한 코드
    // 제이슨 전달할때 객체안의 객체 넣지말라고 오류났었음
    targetWholeData = JSON.parse(JSON.stringify(targetWholeData));

    //pageProps로 넘길 데이터
    return { props: { targetWholeData, postId } };
};
