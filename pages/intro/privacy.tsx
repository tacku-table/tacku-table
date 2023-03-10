import type { NextPage } from "next";
import Seo from "../../components/layout/Seo";

const Privacy: NextPage = () => {
  return (
    <div className="text-mono100 w-full md:w-2/3 lg:w-4/6 xl:w-1/2 mx-auto p-20">
      <Seo title="개인정보처리방침" />

      <h3 className="text-3xl mb-7">개인정보처리방침</h3>
      <p className="text-mono80 text-sm mb-7">
        개인정보의 수집 내용은 아래와 같습니다.
      </p>
      <div className="space-y-4">
        <h4>필수항목</h4>
        <p className="text-mono80 text-sm">
          : 로그인ID, 로그인Password, e-mail, 닉네임
        </p>
        <h4>선택항목</h4>
        <p className="text-mono80 text-sm"> : 프로필사진</p>
        <h4>개인정보 수집에 대한 동의</h4>
        <p className="text-mono80 text-sm">
          회사는 회원님의 개인정보 수집에 대하여 동의를 받고 있으며, 회사 내의
          회원가입 절차 중 이용약관 및 개인정보처리방침에 개인정보 수집
          동의절차를 마련해 두고 있습니다. 회원님께서 &#91;이용약관과
          개인정보취급방침에 동의합니다.&#93;란에 체크하시면 개인정보 수집에
          대해 동의한 것으로 봅니다.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
