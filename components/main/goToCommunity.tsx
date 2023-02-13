import type { NextPage } from "next";
import Link from "next/link";

const GoToCommunity: NextPage = () => {
    return (
        <div className="h-[500px] bg-gray-900 text-white flex flex-col justify-center pl-56">
            <p className="text-xl font-semibold mb-4">커뮤니티</p>
            <p className="text-sm">
                애니메이션과 애니에 나오는 요리 등 다양한 주제로<br></br>
                다양한 사람들과 소통해보세요!
            </p>
            <Link legacyBehavior href="/communityPage">
                <button
                    type="button"
                    className="w-56 rounded-3xl border-slate-50 border-[1px] border-opacity-40 font-medium text-sm px-5 py-4 text-center flex justify-center items-center mt-11 hover:scale-105 hover:border-opacity-90"
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
    );
};

export default GoToCommunity;
