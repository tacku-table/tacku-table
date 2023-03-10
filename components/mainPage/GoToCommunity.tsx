import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import chihiro from "../../public/images/chihiro.jpg";

const GoToCommunity: NextPage = () => {
    return (
        <div className="relative w-full text-white flex flex-col justify-center items-center aspect-[4/3] sm:aspect-[6/2] md:aspect-[7/3] lg:aspect-[7/2] xl:aspect-[4/1]">
            <Image
                width={1200}
                height={250}
                alt="chihiro"
                src={chihiro}
                className="w-full h-full absolute top-0 left-0 object-cover object-right"
            />
            <div className="flex flex-col justify-center items-center z-50 bg-black w-full h-full bg-opacity-30 md:bg-opacity-10 md:items-start md:w-4/6">
                <p className="text-xl font-semibold mb-4">커뮤니티</p>
                <p className="text-sm">
                    애니메이션과 애니에 나오는 요리 등 다양한 주제로<br></br>
                    다양한 사람들과 소통해보세요!
                </p>
                <Link legacyBehavior href="/community">
                    <button
                        type="button"
                        className="w-3/5 md:w-2/5 xl:w-4/12 rounded-sm border-slate-50 border border-opacity-40 font-medium text-sm px-5 py-4 text-center flex justify-center items-center mt-11 hover:scale-105 hover:border-opacity-90 transition-transform z-50"
                    >
                        커뮤니티 보러가기&nbsp;&nbsp;
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default GoToCommunity;
