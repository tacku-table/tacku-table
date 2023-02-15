import { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { authService, dbService } from "@/config/firebase";
import { useRouter } from "next/router";
import Bookmark from "@/components/detail/Bookmark";

export interface PostType {
  animationTitle: string;
  content: string;
  cookingTime: string;
  createdAt: number;
  displayStatus: string;
  foodTitle: string;
  thumbnail: string;
  uid: string;
}
//자식한테 props로 타입 넘겨줬는데 왜 오류가 날까...
const DetailReciptPage = ({
  post,
  children,
}: {
  post: PostType;
  children: React.ReactNode;
}) => {
  //레시피 데이터
  const [recipeData, getRecipeData] = useState<any>("");
  const [userData, setUserData] = useState<any>("");
  const router = useRouter();
  //해당 레시피 id 파람
  const { id }: any = router.query;
  const postUser = recipeData.uid;

  console.log("post", post);
  console.log("children", children);

  //레시피 데이터 불러오기
  useEffect(
    () =>
      onSnapshot(doc(dbService, "recipe", id), (snapshot) => {
        getRecipeData(snapshot.data());
      }),

    []
  );
  // 계정 정보 가져오기
  useEffect(() => {
    onSnapshot(doc(dbService, "user", id), (snapshot) => {
      setUserData(snapshot.data());
      console.log(postUser);
    });
  }, []);
  //조회수
  // useEffect(() => {
  //   onSnapshot(doc(dbService, "user", recipeData.uid), (doc) => {
  //     setUserData(doc.data());
  //   });
  //   console.log(userData);
  // }, []);

  return (
    <>
      <img src={recipeData.thumbnail} alt="thumbnail" />
      <div>음식제목 : {recipeData.foodTitle}</div>
      <div>닉네임 : {recipeData.displayName}</div>
      <Bookmark id={id} recipeData={recipeData} />
      <div>조회수 : {recipeData.viewCounting}</div>
      <div>좋아요 : {recipeData.bookmarkCount}</div>
      <div>재료 : {recipeData.ingredient}</div>
      <div>영화 : {recipeData.animationTitle}</div>
      <div>카테고리 : {recipeData.foodCategory}</div>
      <div>요리시간 : {recipeData.cookingTime}</div>
      <div dangerouslySetInnerHTML={{ __html: recipeData.content }} />
    </>
  );
};

export default DetailReciptPage;
