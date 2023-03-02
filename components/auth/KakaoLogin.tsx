import QueryString from "query-string";
import React, { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc } from "@firebase/firestore";
import { signInWithCustomToken } from "firebase/auth";
import { apiKey, dbService, authService } from "@/config/firebase";

export const KakaoLogin = () => {
  const loginHandler = () => {
    window.location.replace(link);
  };

  const REST_API_KEY = "741cc72b303dc404d77509468ad01f5f";
  const REDIRECT_URI = "http://localhost:3000/loginPage";
  const CLIENT_SECRET = "8EI8fSor7R3jO2Ynn3DGy0RXueH7qiO6";

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  useEffect(() => {
    //현재 윈도우 창의 주소값 불러옴
    const newLocation = document.location;
    //현재 url의 파라미터를 가져옴
    const PARAMS = new URL(`${newLocation}`).searchParams;
    //params에 저장된 파라미터 안에서 'code'의 값을 가져옴
    const KAKAO_CODE = PARAMS.get("code");
    getKakaoToken(KAKAO_CODE);
  }, []);

  const getKakaoToken = (KAKAO_CODE: any) => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: QueryString.stringify({
        //엑세스 토큰을 요청하기위해 필요한 토큰과 key값들
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI, //위쪽에 전부 변수로 지정해주었기에불러오기만 하면된다
        code: KAKAO_CODE,
        client_secret: CLIENT_SECRET,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          sessionStorage.setItem("token", data.access_token);
          getUserInfo(data.access_token);
        }
      });
  };

  const getUserInfo = (token: any) => {
    fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        // custom token을 이용한 로그인
        signInWithCustomToken(authService, res);
        console.log(res);
        const nickname = res.kakao_account.profile.nickname;
        const kakaoId = res.id;
        const email =
          res.kakao_account.email_needs_agreement === true
            ? "null"
            : res.kakao_account.email;
        sessionStorage.setItem("User", JSON.stringify(res));
        await setDoc(doc(dbService, "user", `${kakaoId}`), {
          userId: `${kakaoId}`,
          userNickname: nickname,
          userEmail: email,
          userPw: "kakao",
          userImg: "null",
        });
        //location.href = "/mainPage";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const loginHandler = () => {
  //   const Kakao =
  //   window.Kakao?.Auth.login({
  //     scope: "profile_nickname, account_email, profile_image",
  //     success: function (authObj: any) {
  //       //authObj 토큰
  //       window.Kakao.API.request({
  //         url: "/v2/user/me",
  //         success: (res: any) => {
  //           // kakao_account 유저정보
  //           const kakao_account = res.kakao_account;
  //           console.log("kakao.account", kakao_account);
  //         },
  //       });
  //     },
  //   }).then(async (res: any) => {
  //     const nickname = res.kakao_account.profile.nickname;
  //     const kakaoId = res.id;
  //     const email =
  //       res.kakao_account.email_needs_agreement === true
  //         ? "null"
  //         : res.kakao_account.email;
  //     sessionStorage.setItem("User", JSON.stringify(res));
  //     await setDoc(doc(dbService, "user", `${kakaoId}`), {
  //       userId: kakaoId,
  //       userNickname: nickname,
  //       userEmail: email,
  //       userPw: "kakao",
  //       userImg: "null",
  //     });
  //   });
  // };

  return <button onClick={loginHandler}>카카오로그인</button>;
};
