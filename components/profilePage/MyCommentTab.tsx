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

interface CommentProp {
  postId: string;
  boardId: string;
  comment: string;
  writtenDate: string;
}

const MyCommentTab = ({ userInfo }: MyTabProp) => {
  const [commentPost, setCommentPost] = useState<CommentProp[]>([]);
  const [communityList, setCommunityList] = useState<TCommunity[]>([]);
  const { communityPost } = useGetCommunityPost();

  useEffect(() => {
    setCommunityList(communityPost);
    getCommunityComment(userInfo?.userId as unknown as string);
  }, [commentPost]);

  // uid 기반으로 가져오는 함수
  const getCommunityComment = async (userId: string) => {
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
          writtenDate: doc.data().writtenDate,
        };
        return mypost;
      });
      setCommentPost(myposts);
    });
  };

  return (
    <Tab.Panel className="pb-6 w-full h-[80%]">
      {commentPost?.length === 0 && <EmptyPost></EmptyPost>}
      {commentPost?.map((p) => (
        <div key={p.postId} className="pt-6 px-1 sm:p-6">
          <hr className="border-mono50 mx-8 mb-6 border-[1px]" />
          <div className="pl-8 sm:space-x-[20px] space-x-4 items-center flex">
            <div>
              <div className="flex flex-col text-lg sm:text-[24px] font-semibold text-mono100">
                <Link legacyBehavior href={`/community/${p.boardId}`}>
                  <a>{p.comment}</a>
                </Link>
              </div>
              {communityList.map(
                (item) =>
                  item.id === p.boardId && (
                    <div key={item.id} className="flex flex-col">
                      <span className="text-mono70 text-xs mb-2">
                        {p.writtenDate}
                      </span>
                      <span className="text-mono80 sm:text-base">
                        {item.title}
                      </span>
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
