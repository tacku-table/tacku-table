// global.d.ts
declare global {
  interface RecipeProps {
    id?: string | number;
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
