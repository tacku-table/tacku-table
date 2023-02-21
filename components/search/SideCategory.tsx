import type { NextPage } from "next";
import { useRouter } from "next/router";

const SideCategory: NextPage = () => {
    const router = useRouter();
    // const deliverCate = (e:HTMLLIElement) => {
    //     router.push({
    //         pathname: "/searchPage/[cate]",
    //         query: { keyword: e.target.id },
    //     });
    // };
    return (
        <div className="space-y-7">
            <ul>
                <p className="">음식 종류</p>
                <li id="밥&도시락&면">밥/도시락/면</li>
                <li>국/탕/찌개</li>
                <li>구이/볶음/찜</li>
                <li>베이커리/디저트</li>
                <li>음료/주류</li>
                <li>식단/건강관리</li>
            </ul>
            <div className="bg-border w-full h-[0.5px]"></div>
            <ul>
                <p>조리 시간</p>
                <li>15분 이하</li>
                <li>30분</li>
                <li>1시간</li>
                <li>1시간 이상</li>
            </ul>
        </div>
    );
};

export default SideCategory;
