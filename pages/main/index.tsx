import TopButton from "@/components/button/TopButton";
import BestRecipe from "@/components/mainPage/BestRecipe";
import GoToCommunity from "@/components/mainPage/GoToCommunity";
import NewRecipe from "@/components/mainPage/NewRecipe";
import SearchRecipeBar from "@/components/mainPage/SearchRecipeBar";
import Slider from "@/components/mainPage/Slider";
import Special from "@/components/mainPage/Special";
import Video from "@/components/mainPage/Video";

const main = () => {
    return (
        <div className="w-full">
            <Video />
            <div className="w-[1150px] mx-auto">
                <Slider />
            </div>
            <div className="w-4/5 mx-auto py-10 pb-[115px] flex flex-col items-center">
                <SearchRecipeBar />
                <BestRecipe />
                <NewRecipe />
            </div>
            <GoToCommunity />
            <Special />
            <TopButton />
        </div>
    );
};

export default main;
