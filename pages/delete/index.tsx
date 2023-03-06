import Image from "next/image";
import React from "react";
import deletePageImg from "../../public/images/deletePage.png";

const deletePage = () => {
    return (
        <div className="flex flex-col my-auto items-center">
            <div className="text-center m-auto pt-[183px] pb-[184px]">
                <Image
                    className="m-auto w-[240px] h-[181px] object-cover object-center"
                    src={deletePageImg}
                    width={300}
                    height={300}
                    alt="삭제된 페이지입니다."
                />

                <h3 className="text-[24px] font-semibold mt-[29px]">
                    앗, 이미 삭제된 레시피 페이지에요
                </h3>
                <p className="font-normal mt-[20px] leading-[30px]">
                    작성자에 의해 삭제된 페이지 입니다. <br />
                    메인페이지로 돌아가 새로운 레시피를 찾아볼까요?
                </p>
                <button
                    onClick={() => {
                        location.href = "/main";
                    }}
                    type="button"
                    className="mt-[24px] w-[100px] h-[36px] text-brand100 text-center text-[16px] border border-brand100 "
                >
                    메인으로
                </button>
            </div>
        </div>
    );
};

export default deletePage;
