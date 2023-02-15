import BestRecipe from "@/components/main/BestRecipe";
import GoToCommunity from "@/components/main/GoToCommunity";
import NewRecipe from "@/components/main/NewRecipe";
import Video from "@/components/main/video";

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
                <BestRecipe />
                <NewRecipe />
            </div>
            <GoToCommunity />
            <div className="h-[500px] bg-red-200">보너스</div>
        </div>
    );
};

export default MainPage;
