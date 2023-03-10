import type { NextPage } from "next";
import Image from "next/image";
import logo2 from "../../public/images/logo2.png";
import Seo from "../../components/layout/Seo";

const App: NextPage = () => {
    return (
        <div className="w-full md:w-2/3 lg:w-4/6 xl:w-1/2 mx-auto p-20">
            <Seo title="타쿠의 식탁 소개" />
            <div className="border rounded-sm">
                <h3 className="mb-10 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-[#e95318f7] to-[#fce343]">
                    &#35; About us
                </h3>
                <div className="flex flex-col justify-center items-center space-y-7">
                    <Image
                        width={500}
                        height={250}
                        alt="logo_image"
                        src={logo2}
                    />
                    <div className="mt-10 text-mono80 space-y-4">
                        <p>
                            타쿠의 식탁은 프론트엔드 개발자 4명이 만든 사용자
                            공유형 애니메이션전문 레시피사이트입니다.
                        </p>
                        <p>사이트소개</p>
                        <p>
                            내가 만든 비룡의 황금볶음밥, 하울보다 더 잘 구운
                            베이컨 계란을 자랑하고 싶을 때!
                            <br />
                            바로 저희 &quot;타쿠의 식탁&quot;으로 오세요. 요즘
                            인기있는 레시피들은 물론이고 실시간으로 업데이트되는
                            최신레시피들도 함께 만나실 수 있어요. 물론 레시피
                            뿐만 아니라 다른 회원들과 즐겁게 이야기를 나눌 수
                            있는 커뮤니티 공간도 마련되어 있답니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
