import TopButton from "@/components/button/TopButton";
import BestRecipe from "@/components/main/bestRecipe";
import GoToCommunity from "@/components/main/goToCommunity";
import NewRecipe from "@/components/main/newRecipe";
import SearchRecipeBar from "@/components/main/SearchRecipeBar";
import Slider from "@/components/main/Slider";
import Special from "@/components/main/Special";
import Video from "@/components/main/video";

const MainPage = () => {
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

export default MainPage;
