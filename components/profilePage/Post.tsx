import Image from "next/image";
import defaultImg from "../../public/images/test1.png";
import useGetUserProfileNickName from "@/hooks/useGetUserProfileNickName";

const Post = ({ writerUid }: any) => {
  const { userNickName: writerdisplayName, userProfileURL: writerImg } =
    useGetUserProfileNickName(writerUid);

  return (
    <>
      {writerImg === "null" ? (
        <Image
          className="aspect-square rounded-md object-cover w-12 h-12"
          src={defaultImg}
          priority={true}
          loader={({ src }) => src}
          width={12}
          height={12}
          alt="글쓴이프로필"
        />
      ) : (
        <Image
          className="aspect-square rounded-md object-cover w-12 h-12"
          src={writerImg}
          priority={true}
          loader={({ src }) => src}
          width={12}
          height={12}
          alt="글쓴이프로필"
        />
      )}
      <p className="text-[16px]">{writerdisplayName}</p>
    </>
  );
};

export default Post;
