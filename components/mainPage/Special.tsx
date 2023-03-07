import Image from "next/image";
import haku from "../../public/images/haku.png";
import SearchRecipeBar from "./SearchRecipeBar";

const Special = () => {
    return (
        // <div className="">
        <div>
            <h3 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-[#e95318f7] to-[#fce343] pt-14 ">
                #SHOW US YOUR RECIPE
            </h3>
            <h4 className="pt-7 text-3xl font-semibold">
                당신만의 특별한 레시피를 보여 주세요!
            </h4>
            <p className="mt-7 mb-14 text-mono80">
                애니메이션을 보다가 여기 나오는 음식 한 번 먹어보고 싶다!
                <br />
                생각한 적 있으신가요?
                <br />
                <br />
                타쿠의 식탁은 사용자 공유형 레시피사이트입니다.
                <br />
                일상 속에 지친 당신을 위해 오늘 하루
                <br />
                애니에 나오는 특별한 음식으로 주인공이 되어보는 건 어떨까요?
            </p>
        </div>
        /* <Image src={haku} alt="animation_image" width={400} height={350} /> */
        // </div>
    );
};

export default Special;
