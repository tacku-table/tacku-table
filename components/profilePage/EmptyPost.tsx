import Image from "next/image";
import emptyPostImg from "../../public/images/logo2-2.png";

const EmptyPost = () => {
  return (
    <div className="flex flex-col my-auto items-center">
      <div className="text-center m-auto pt-[183px] pb-[184px]">
        <Image
          className="m-auto w-[240px] h-[181px] object-cover object-center"
          src={emptyPostImg}
          width={300}
          height={300}
          alt="삭제된 페이지입니다."
        />

        <h3 className="text-[24px] font-semibold mt-[29px]">
          게시글이 존재하지 않습니다.
        </h3>
      </div>
    </div>
  );
};

export default EmptyPost;
