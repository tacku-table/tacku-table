// global.d.ts
declare global {
  interface TBookmark {
    postId: string;
    writerUid: string;
    writerdisplayName: string;
    writerImg: string;
    viewCount: number;
    animationTitle: string;
    cookingTime: string;
    foodTitle: string;
    thumbnail: string;
  }
  interface TUserInfo {
    uid?: string | undefined;
    userId?: string | undefined;
    userEmail?: string | undefined;
    userImg?: string | undefined;
    userNickname?: string | undefined;
    userPw?: string | undefined;
  }

  interface TypeRecipe {
    id?: string;
    uid?: string;
    animationTitle?: string;
    foodTitle?: string;
    ingredient?: string;
    cookingTime?: string;
    foodCategory?: string;
    displayStatus?: string;
    thumbnail?: string;
    createdAt?: string | number;
    content?: string;
    children?: JSX.Element | JSX.Element[];
    bookmarkCount?: string[];
  }
  interface TypeShowPw {
    showPw: boolean;
    setShowPw: (showPw: boolean) => void;
  }
  interface TypeShowPwConfirm {
    showPwConfirm: boolean;
    setShowPwConfirm: (showPwConfirm: boolean) => void;
  }
  interface TypeSearchPageProps {
    next?: () => void;
    lastDoc?: number;
    text?: string;
    totalItems?: TypeRecipe[];
    currentItems?: TypeRecipe[];
    dataResults?: TypeRecipe[];
    isBest?: string;
    activeBestBtn?: () => void;
    inactiveBestBtn?: () => void;
    filteredFood?: string[];
    filteredTime?: string[];
  }
  interface targetWholeDataType {
    animationTitle: string;
    content: string;
    cookingTime: string;
    createdAt: number;
    displayStatus: string;
    foodCategory: string;
    foodTitle: string;
    ingredient: string;
    thumbnail: string;
    uid: string;
    viewCount: number;
    writerNickName: string;
    writerProfileImg: string;
  }

  interface UserType {
    [key: string]: string;
  }

  interface parseUserType {
    [key: string]: string;
  }

  interface communityPostType {
    [key: string]: string;
  }
  interface Window {
    Kakao: any;
  }
}

export {};
