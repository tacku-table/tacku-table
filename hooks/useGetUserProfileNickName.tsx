import { dbService } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";

const useGetUserProfileNickName = async (writterUID: string) => {
  console.log("writterUID:", writterUID);
  const [userNickName, setUserNickName] = useState("");
  const [userProfileURL, setUserProfileURL] = useState("");

  const docRef = doc(dbService, "user", writterUID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const userData = docSnap.data();
    setUserNickName(userData.userNickname);
    setUserProfileURL(userData.userImg);
  } else {
    console.log("No such document!");
  }
  console.log("userNickName:", userNickName);
  console.log("userProfileURL:", userProfileURL);

  return { userNickName, userProfileURL };
};

export default useGetUserProfileNickName;
