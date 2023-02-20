import { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Bookmark from "@/components/detail/Bookmark";
import styled from "styled-components";
import defaultImg from "../../public/images/profile.jpeg";
import Image from "next/image";
import { BsClock } from "react-icons/bs";

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

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className=" w-[780px] h-[606px]  my-16">
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
        <div>
          <div className="text-4xl font-bold">
            음식제목 : {recipeData.foodTitle}
          </div>
          <Bookmark
            postId={props.postId}
            recipeData={recipeData}
            userData={userData}
          />
          <div>
            <BsClock />
            {recipeData.cookingTime}
          </div>
          <div className="text-base">영화 : {recipeData.animationTitle}</div>
          <div>카테고리 : {recipeData.foodCategory}</div>
        </div>
        <div>
          {userFireData.userImg === "null" ? (
            <Image
              src={defaultImg}
              width={100}
              height={100}
              alt="default_img"
            />
          ) : (
            <Image
              src={userFireData.userImg}
              priority={true}
              loader={({ src }) => src}
              width={100}
              height={100}
              alt="user_img"
            />
          )}
          <p>{userFireData.userNickname}</p>
        </div>
        <div>조회수 : {views}</div>
      </div>
      <div>재료 : {recipeData.ingredient}</div>
      <Content dangerouslySetInnerHTML={{ __html: recipeData.content }} />
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

const Content = styled.div`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  color: gray;
  background: white;
`;
