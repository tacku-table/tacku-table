import Image from "next/image";
import haku from "../../public/images/haku.png";

const Special = () => {
    return (
        <div className="relative w-full h-[400px]">
            <Image
                src={haku}
                alt="animation_image"
                width={340}
                height={300}
                className="absolute bottom-0 right-36"
            />
            <h3 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 pt-14 pl-[248px]">
                #SHOW US YOUR RECIPE
            </h3>
            <h4 className="pt-7 pl-[248px] text-3xl font-extrabold">
                당신만의 특별한 레시피를 보여 주세요!
            </h4>
            <p></p>
        </div>
    );
};

export default Special;
