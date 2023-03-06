import { Tab } from "@headlessui/react";
import { authService, dbService } from "@/config/firebase";
import { convertTimestamp } from "../../util";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import EmptyPost from "./EmptyPost";
const MyCommunityTab = ({ userInfo }: any) => {
  const [communityPost, setCommunityPost] = useState<any[]>([]);

  useEffect(() => {
    getMyCommunityPost(userInfo.userId);
  }, [communityPost]);

  const getMyCommunityPost = async (userId: any) => {
    const communityRef = collection(dbService, "communityPost");
    const q = query(
      communityRef,
      where("uid", "==", `${userId}`),
      orderBy("writtenDate", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          writtenDate: convertTimestamp(doc.data().writtenDate),
          category: doc.data().category,
          title: doc.data().title,
        };
        return mypost;
      });
      setCommunityPost(myposts);
    });
  };
  return (
    <Tab.Panel className="pb-6">
      {communityPost.length === 0 && <EmptyPost />}
      {communityPost?.map((p) => (
        <div key={p.postId} className="p-6">
          <hr className="border-mono50 mx-8 mb-6 border-[1px]" />
          <div className="pl-8 space-x-[20px] items-center flex">
            <div className="flex flex-col">
              <div className="space-x-[10px]">
                <span>{p.category}게시판</span>
                <span>|</span>
                <span>{p.writtenDate}</span>
              </div>
              <Link legacyBehavior href={`/community/${p.postId}`}>
                <a className="text-2xl font-semibold">{p.title}</a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Tab.Panel>
  );
};

export default MyCommunityTab;
