import TopButton from "@/components/button/TopButton";
import BestRecipe from "@/components/mainPage/BestRecipe";
import GoToCommunity from "@/components/mainPage/GoToCommunity";
import NewRecipe from "@/components/mainPage/NewRecipe";
import SearchRecipeBar from "@/components/mainPage/SearchRecipeBar";
import Special from "@/components/mainPage/Special";
import Video from "@/components/mainPage/Video";
import Seo from "../../components/layout/Seo";

const Main = () => {
    return (
        <div className="w-full">
            <Seo title="타쿠의 식탁" />
            <div className="w-4/5 mx-auto flex flex-col justify-center items-center xl:flex-row xl:gap-x-4">
                <Video />
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
