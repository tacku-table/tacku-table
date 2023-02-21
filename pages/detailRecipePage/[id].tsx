import { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Bookmark from "@/components/detail/Bookmark";
import defaultImg from "../../public/images/profile.jpeg";
import Image from "next/image";
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
    <div className="w-full h-full flex flex-col items-center bg-mono50 ">
      <div className=" w-[780px] my-16 bg-white p-7">
        <div className="bg-slate-100 w-full h-[440px] overflow-hidden relative">
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            src={recipeData.thumbnail}
            loader={({ src }) => src}
            alt="thumbnail"
            className="image-detail"
          />
        </div>
        <div className="flex-col my-5">
          <div className="flex justify-between my-5">
            <p className="text-2xl font-semibold">{recipeData.foodTitle}</p>
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
                stroke-width="3"
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
          <div className="flex justify-between border-b-2 border-border-500 pb-8 my-5">
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
            <p className="pl-5 font-semibold">{userFireData.userNickname}</p>
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
            style={{ text-align:  }}
            dangerouslySetInnerHTML={{ __html: recipeData.content }}
          />
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
