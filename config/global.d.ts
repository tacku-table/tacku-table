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
}

export {};
