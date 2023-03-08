import TopButton from "@/components/button/TopButton";
import BestRecipe from "@/components/mainPage/BestRecipe";
import GoToCommunity from "@/components/mainPage/GoToCommunity";
import NewRecipe from "@/components/mainPage/NewRecipe";
import SearchRecipeBar from "@/components/mainPage/SearchRecipeBar";
import Slider from "@/components/mainPage/Slider";
import Special from "@/components/mainPage/Special";
import Video from "@/components/mainPage/Video";

const Main = () => {
    return (
        <div className="w-full">
            <div className="flex justify-center gap-x-7">
                <div>
                    <Video />
                    <div className="">
                        <Slider />
                    </div>
                </div>
                <Special />
            </div>
            <div className="w-4/5 mx-auto py-7 flex flex-col items-center">
                <SearchRecipeBar />
                <BestRecipe />
                <NewRecipe />
            </div>
            <GoToCommunity />
            <TopButton />
        </div>
    );
};

export default Main;
