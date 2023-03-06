import { Tab } from "@headlessui/react";
import { dbService } from "@/config/firebase";
import { convertTimestamp } from "../../util";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import useGetCommunityPost from "@/hooks/useGetCommunityPost";
import EmptyPost from "./EmptyPost";
const MyCommentTab = ({ userInfo }: any) => {
  const [commentPost, setCommentPost] = useState<any[]>([]);
  const [communityList, setCommunityList] = useState<any[]>([]);
  const { communityPost } = useGetCommunityPost();

  useEffect(() => {
    setCommunityList(communityPost);
    getCommunityComment(userInfo.userId);
  }, [commentPost]);

  const getCommunityComment = async (userId: any) => {
    const commentsRef = collection(dbService, "comments");
    const q = query(
      commentsRef,
      where("uid", "==", `${userId}`),
      orderBy("ordeyByDate", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const myposts = snapshot.docs.map((doc) => {
        const mypost = {
          postId: doc.id,
          boardId: doc.data().boardId,
          comment: doc.data().comment,
        };
        return mypost;
      });
      setCommentPost(myposts);
    });
  };

  return (
    <Tab.Panel className="pb-6">
      {commentPost.length === 0 && <EmptyPost></EmptyPost>}
      {commentPost?.map((p) => (
        <div key={p.postId} className="p-6">
          <hr className="border-border mx-8 my-6 border-[1px]" />
          <div className="pl-8 space-x-[20px] items-center flex">
            <div className="flex flex-col">
              <div className="text-2xl font-semibold mb-4">
                <Link legacyBehavior href={`/community/${p.boardId}`}>
                  <a>{p.comment}</a>
                </Link>
              </div>
              {communityList.map(
                (item) =>
                  item.id === p.boardId && (
                    <div key={item.id}>
                      <div className="space-x-[10px] text-mono70">
                        <span>
                          {item.category}
                          게시판
                        </span>
                      </div>
                      <div className="text-mono70">{item.title}</div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </Tab.Panel>
  );
};

export default MyCommentTab;
