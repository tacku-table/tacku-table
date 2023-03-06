import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import defaultImg from "../../public/images/test1.png";
import useGetUserProfileNickName from "@/hooks/useGetUserProfileNickName";

const Post = ({ p }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const writterUid = p.writterUid;

  const { userNickName: writterNickname } =
    useGetUserProfileNickName(writterUid);

  useEffect(() => {
    if (writterNickname) {
      setIsLoading(false);
    }
  });
  if (isLoading) {
    return <></>;
  }

  return (
    <div className="border-b border-mono60 py-4 px-5 flex text-sm">
      <Link legacyBehavior href={`/community/${p.id}`}>
        {p.thumbnail === "" ? (
          <Image
            className="object-cover aspect-[4/3] rounded-md cursor-pointer"
            src={defaultImg}
            priority={true}
            width={70}
            height={41}
            alt="community-thumbnail-default"
          />
        ) : (
          <Image
            className="object-cover aspect-[4/3] rounded-md cursor-pointer"
            src={p.thumbnail}
            priority={true}
            loader={({ src }) => src}
            width={70}
            height={41}
            alt="community-thumbnail"
          />
        )}
      </Link>
      <div className="pl-5">
        <Link legacyBehavior href={`/community/${p.id}`}>
          <a>{p.title}</a>
        </Link>
        <div className="flex mt-3 text-mono70">
          <div className="border-r border-mono60 pr-3">{p.category}</div>
          <div className="border-r w-[147px]  border-mono60 px-3">
            {p.writtenDate}
          </div>
          <Link legacyBehavior href={`/profile/${p.writterUid}`}>
            <span className="pl-3 cursor-pointer">{writterNickname}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
