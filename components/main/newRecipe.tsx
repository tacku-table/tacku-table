import type { NextPage } from "next";

const NewRecipe: NextPage = () => {
    return (
        <>
            <div className="space-y-4 flex flex-col items-center mt-32 mb-14">
                <p className="text-3xl font-extrabold">최신레시피</p>
                <p className="text-lg font-medium text-slate-500">
                    타쿠의 식탁에서 HOT한 실패없는 요즘유행요리
                </p>
            </div>
            <div className="space-x-7 flex justify-center items-center">
                <div className="space-y-2">
                    <div className="bg-slate-100 w-72 h-56">요리사진</div>
                    <div className="text-sm text-slate-500 space-x-2">
                        <span>#천공의 성 라퓨타</span>
                        <span>#15분이하</span>
                        <span>#초간단</span>
                    </div>
                    <p className="text-lg text-slate-900 font-semibold">
                        라퓨타 토스트
                    </p>
                </div>
                <div className="space-y-2">
                    <div className="bg-slate-100 w-72 h-56">요리사진</div>
                    <div className="text-sm text-slate-500 space-x-2">
                        <span>#천공의 성 라퓨타</span>
                        <span>#15분이하</span>
                        <span>#초간단</span>
                    </div>
                    <p className="text-lg text-slate-900 font-semibold">
                        라퓨타 토스트
                    </p>
                </div>
                <div className="space-y-2">
                    <div className="bg-slate-100 w-72 h-56">요리사진</div>
                    <div className="text-sm text-slate-500 space-x-2">
                        <span>#천공의 성 라퓨타</span>
                        <span>#15분이하</span>
                        <span>#초간단</span>
                    </div>
                    <p className="text-lg text-slate-900 font-semibold">
                        라퓨타 토스트
                    </p>
                </div>
            </div>
        </>
    );
};

export default NewRecipe;
