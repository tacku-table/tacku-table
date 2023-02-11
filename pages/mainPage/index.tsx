import Link from "next/link";
import React from "react";
import Video from "./video";

const MainPage = () => {
    return (
        <div className="w-full h-full">
            <Video />
            <div className="h-[50px] bg-teal-200">태그</div>
            <div className="h-[1500px] py-20 flex flex-col items-center">
                <div className="relative mt-4 mb-7">
                    <input
                        type="text"
                        className="w-[300px] text-sm font-medium px-5 py-2.5 pl-11 focus:outline-none rounded-lg rounded-r-none border border-slate-300"
                        placeholder="하울 정식"
                    ></input>
                    <button
                        type="button"
                        className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg rounded-l-none text-white text-sm px-5 py-[10.5px] text-center"
                    >
                        레시피검색
                    </button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-300 absolute top-2.5 ml-3 pointer-events-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
                <div className="space-y-4 flex flex-col items-center mt-28 mb-14">
                    <p className="text-3xl font-extrabold">인기레시피</p>
                    <p className="text-lg font-medium text-slate-500">
                        타쿠의 식탁에서 HOT한 실패없는 인기만점요리
                    </p>
                </div>
                <div className="space-x-7 flex justify-center items-center">
                    <div className="space-y-2">
                        <div className="bg-slate-100 w-72 h-56">요리사진</div>
                        <div className="text-sm text-slate-500 space-x-2">
                            <span>#천공의 성 라퓨타</span>
                            <span>#15분이하</span>
                            <span>#초간단</span>
                        </div>
                        <p className="text-lg text-slate-900 font-semibold">
                            라퓨타 토스트
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-slate-100 w-72 h-56">요리사진</div>
                        <div className="text-sm text-slate-500 space-x-2">
                            <span>#천공의 성 라퓨타</span>
                            <span>#15분이하</span>
                            <span>#초간단</span>
                        </div>
                        <p className="text-lg text-slate-900 font-semibold">
                            라퓨타 토스트
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-slate-100 w-72 h-56">요리사진</div>
                        <div className="text-sm text-slate-500 space-x-2">
                            <span>#천공의 성 라퓨타</span>
                            <span>#15분이하</span>
                            <span>#초간단</span>
                        </div>
                        <p className="text-lg text-slate-900 font-semibold">
                            라퓨타 토스트
                        </p>
                    </div>
                </div>
                <div className="space-y-4 flex flex-col items-center mt-32 mb-14">
                    <p className="text-3xl font-extrabold">최신레시피</p>
                    <p className="text-lg font-medium text-slate-500">
                        타쿠의 식탁에서 HOT한 실패없는 요즘유행요리
                    </p>
                </div>
                <div className="space-x-7 flex justify-center items-center">
                    <div className="space-y-2">
                        <div className="bg-slate-100 w-72 h-56">요리사진</div>
                        <div className="text-sm text-slate-500 space-x-2">
                            <span>#천공의 성 라퓨타</span>
                            <span>#15분이하</span>
                            <span>#초간단</span>
                        </div>
                        <p className="text-lg text-slate-900 font-semibold">
                            라퓨타 토스트
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-slate-100 w-72 h-56">요리사진</div>
                        <div className="text-sm text-slate-500 space-x-2">
                            <span>#천공의 성 라퓨타</span>
                            <span>#15분이하</span>
                            <span>#초간단</span>
                        </div>
                        <p className="text-lg text-slate-900 font-semibold">
                            라퓨타 토스트
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-slate-100 w-72 h-56">요리사진</div>
                        <div className="text-sm text-slate-500 space-x-2">
                            <span>#천공의 성 라퓨타</span>
                            <span>#15분이하</span>
                            <span>#초간단</span>
                        </div>
                        <p className="text-lg text-slate-900 font-semibold">
                            라퓨타 토스트
                        </p>
                    </div>
                </div>
            </div>
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
            <div className="h-[500px] bg-red-200">보너스</div>
        </div>
    );
};

export default MainPage;
