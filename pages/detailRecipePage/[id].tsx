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
// 얘는 왜 자꾸 빨간줄 떠있는건가용? (다경)
import defaultImg from "../../public/images/profile.jpeg";
import "react-quill/dist/quill.core.css";
import Image from "next/image";
import Link from "next/link";
//react아이콘

//자식한테 props로 타입 넘겨줬는데 왜 오류가 날까...
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
        <div className="w-full h-full flex flex-col items-center ">
            <div className=" w-[780px] my-16">
                <ImageContainer className="bg-slate-100 w-full h-[440px] overflow-hidden">
                    <Image
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        src={recipeData.thumbnail}
                        loader={({ src }) => src}
                        alt="thumbnail"
                        className="image-detail"
                    />
                </ImageContainer>
                <div className="flex-col my-5">
                    <div className="flex justify-between">
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
                        <span className="float-left">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                className="w-4 h-4 text-red100"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                        <p>{recipeData.cookingTime}</p>
                    </div>
                    <div className="flex justify-between border-b-2 border-border-500 pb-8">
                        <p> {recipeData.animationTitle}</p>
                        <p>{recipeData.foodCategory}</p>
                        <div>조회수 : {views}</div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center">
                        {userFireData.userImg === "null" ? (
                            <Image
                                src={defaultImg}
                                width={50}
                                height={50}
                                alt="default_img"
                                className="rounded-md"
                            />
                        ) : (
                            <Image
                                src={userFireData.userImg}
                                priority={true}
                                loader={({ src }) => src}
                                width={50}
                                height={50}
                                alt="user_img"
                                className="rounded-md"
                            />
                        )}
                        <p>{userFireData.userNickname}</p>
                    </div>
                </div>
                <div>
                    <p className=" border-b-2 border-border-500 pb-8">재료</p>
                    <p> {recipeData.ingredient}</p>
                </div>
                <div className=" border-b-2 border-border-500 pb-8">
                    <p>레시피</p>
                </div>
                <ContentContainer
                    className="view ql-editor"
                    dangerouslySetInnerHTML={{ __html: recipeData.content }}
                />
                {/* 다경 추가한 부분(시작) */}
                {props.targetWholeData.uid == storageCurrentUser.uid ? (
                    <div style={{ backgroundColor: "lightgreen" }}>
                        <Link href={`/recipeEditPage/${props.postId}`}>
                            수정하기
                        </Link>
                        <button type="button" onClick={deleteTargetRecipe}>
                            삭제하기
                        </button>
                    </div>
                ) : (
                    <div></div>
                )}
                {/* 다경 추가한 부분(끝) */}
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

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 440px;
`;

const ContentContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    text-align: center;
    background-color: aliceblue;
`;
