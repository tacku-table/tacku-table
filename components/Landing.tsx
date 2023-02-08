import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <h3>랜딩페이지입니다.</h3>
      <Link href="/mainPage">메인페이지 가기</Link>
    </div>
  );
};

export default LandingPage;
