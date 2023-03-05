// global.d.ts
declare global {
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
    interface TypeSearchPageElement {
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
}

export {};
