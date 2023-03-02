import { dbService } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const useGetUserProfileNickName = (writterUID: string) => {
  const [userNickName, setUserNickName] = useState("");
  const [userProfileURL, setUserProfileURL] = useState("");

  useEffect(() => {
    const setUserNickNameAndProfileURL = async () => {
      const docRef = doc(dbService, "user", writterUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setUserNickName(userData.userNickname);
        setUserProfileURL(userData.userImg);
      } else {
        console.log("No such document!");
      }
    };

    setUserNickNameAndProfileURL();
  }, [userNickName, userProfileURL]);

  return { userNickName, userProfileURL };
};

export default useGetUserProfileNickName;
