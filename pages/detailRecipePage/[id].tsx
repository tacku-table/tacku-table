import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { authService, dbService } from "@/config/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

const DetailReciptPage = () => {
  const [setDetail, getSetDetail]: any = useState();
  const uid = authService.currentUser?.uid;
  const router = useRouter();
  const { id } = router.query;
  const getMyInfo: any = async () => {
    const snapshot = await getDoc(doc(dbService, "recipePost", id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    getSetDetail(data);
  };
  useEffect(() => {
    getMyInfo();
  }, []);

  console.log("setDetail", setDetail);
  return (
    <>
      <div>{setDetail.foodTitle}</div>
      <div>{setDetail.foodTitle}</div>
      <div>{setDetail.foodTitle}</div>
      <div>{setDetail.foodTitle}</div>
      <div>{setDetail.foodTitle}</div>
      <div>{setDetail.foodTitle}</div>
    </>
  );
};

export default DetailReciptPage;
