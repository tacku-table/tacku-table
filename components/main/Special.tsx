import Image from "next/image";
import haku from "../../public/images/haku.png";

const Special = () => {
  return (
    <div className=" w-[1200px] h-[400px] mx-auto flex justify-between">
      <div className="">
        <h3 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 pt-14 ">
          #SHOW US YOUR RECIPE
        </h3>
        <h4 className="pt-7 text-3xl font-extrabold">
          당신만의 특별한 레시피를 보여 주세요!
        </h4>
        <p className="mt-7 text-mono80">
          일상 속에 지친 당신을 위해 매달 하루만큼은 애니에 나오는
          <br />
          캐릭터가 되어 특별한 음식으로 그날 하루는 주인공이 되어보세요.
        </p>
      </div>
      <Image src={haku} alt="animation_image" width={400} height={350} />
    </div>
  );
};

export default Special;
