import type { NextPage } from "next";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "@/config/firebase";

const SearchPage: NextPage = () => {
    const getPostList = async () => {
        const q = query(
            collection(dbService, "recipe"),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    };

    return (
        <div className="w-full h-screen flex justify-center">
            <div>
                <div className="relative mt-4 mb-7 flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-slate-300 absolute top-2.5 -ml-[360px] pointer-events-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    <input
                        type="text"
                        className="w-[300px] text-sm font-medium px-5 py-2.5 pl-11 focus:outline-none rounded-lg rounded-r-none border border-slate-300"
                    ></input>
                    <button
                        type="button"
                        className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg rounded-l-none text-white text-sm px-5 py-[10.5px] text-center"
                    >
                        레시피검색
                    </button>
                </div>
                <div className="space-x-7 flex justify-center items-center">
                    <div className="space-y-2">
                        <div className="bg-slate-100 w-72 h-56">요리사진</div>
                        <ul className="text-sm text-slate-500 space-x-2 flex">
                            <li>#천공의 성 라퓨타</li>
                            <li>#15분이하</li>
                            <li>#초간단</li>
                        </ul>
                        <p className="text-lg text-slate-900 font-semibold">
                            라퓨타 토스트
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
