import Image from "next/image";
import emptyPostImg from "../../public/images/logo2-2.png";

const EmptyPost = () => {
  return (
    <div className="flex flex-col my-auto items-center">
      <div className="text-center m-auto pt-[183px] pb-[184px]">
        <Image
          className="m-auto sm:w-[240px] sm:h-[181px] object-cover object-center w-2/1"
          src={emptyPostImg}
          width={300}
          height={300}
          alt="삭제된 페이지입니다."
        />

        <span className="sm:text-2xl text-sm font-medium sm:mt-9 mt-4">
          게시글이 존재하지 않습니다.
        </span>
      </div>
    </div>
  );
};

export default EmptyPost;
