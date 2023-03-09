import type { NextPage } from "next";

const TermsOfService: NextPage = () => {
    return (
        <div className="text-mono100 w-full md:w-2/3 lg:w-4/6 xl:w-1/2 mx-auto p-20 space-y-4">
            <h3 className="text-3xl">타쿠의 식탁 이용약관</h3>
            <h4>제 1조 목적</h4>
            <p className="text-mono80 text-sm">
                이 약관은 타쿠의 식탁(이하 회사)가 제공하는 모든 서비스(이하
                서비스)를 이용하는 고객(이하 회원)과 회사가 서비스의 이용조건 및
                절차, 권리와 의무, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
            <h4>제 2조 약관의 효력과 변경</h4>
            <p className="text-mono80 text-sm">
                1. 서비스는 본 약관에 규정된 조항을 회원이 수락하는 것을
                조건으로 제공되며 회원이 회원가입시 &quot;동의&quot; 단추를
                누름과 동시에 이 약관에 동의하는 것으로 간주됩니다.
            </p>
            <p className="text-mono80 text-sm">
                2. 이 약관은 온라인을 통해 공시함으로써 효력을 발생합니다.
            </p>
            <p className="text-mono80 text-sm">
                3. 회사는 불가피한 변경의 사유가 있을 때 약관을 임의로 변경할
                권한을 가지며 변경된 약관은 온라인을 통해 공지됨으로써 효력이
                발생됩니다.
            </p>
            <p className="text-mono80 text-sm">
                4. 회원은 변경된 약관에 동의하지 않을 경우 탈퇴를 요청할 수
                있으며 변경된 약관의 효력발생일 이후에도 계속적으로 서비스를
                이용하는 경우에는 회원이 약관의 변경 사항에 동의한 것으로
                봅니다. 이 약관에 명시되지 않은 사항에 대해서는 국내 관련 법령
                규정에 따릅니다.
            </p>
            <h4>제 3조 이용계약의 체결</h4>
            <p className="text-mono80 text-sm">
                이용계약은 회원의 회원가입신청을 회사가 승낙 함으로써
                성립합니다.
            </p>
            <h4>제 4조 이용계약의 해지</h4>
            <p className="text-mono80 text-sm">
                회원은 회사에 언제든 이용계약의 해지를 요청할 수 있습니다.
            </p>
            <h4>제 5조 회원의 의무</h4>
            <p className="text-mono80 text-sm">
                회원은 제3자의 권리나 저작권 등을 침해하는 행위를 할 수
                없습니다.
            </p>
            <h4>제 6조 저작권</h4>
            <p className="text-mono80 text-sm">
                회사의 모든 서비스에 대한 저작권은 회사 및 회사에 콘텐츠를
                제공하는 제공처에 있습니다. 이 모든 저작물은 저작권법 및 관계
                법령에 의해 보호받으며 회사, 콘텐츠 제공처의 사전 승낙 없이
                복제, 출판, 전송, 배포, 방송 기타 방법에 의하여 이용하거나
                제3자에게 이용하게 할 수 없으며, 저작물에 대한 저작권 침해는
                관계 법령의 적용을 받습니다. 회사는 회원이 서비스내의 의견,
                게시판 등에 올린 내용에 대해 책임이 없습니다.
            </p>
        </div>
    );
};

export default TermsOfService;
