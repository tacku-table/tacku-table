import { NextPage } from "next";
import { useRouter } from "next/router";
import { FieldErrors, useForm } from "react-hook-form";

const SearchRecipeBar: NextPage = () => {
    const router = useRouter();
    const { register, handleSubmit, getValues } = useForm();
    const onValid = () => {
        sessionStorage.setItem("searchData", getValues("text"));
        router.push({
            pathname: "/search",
            query: { keyword: getValues("text") },
        });
    };
    const onInValid = (errors: FieldErrors) => {
        console.log(errors);
    };
    return (
        <form
            onSubmit={handleSubmit(onValid, onInValid)}
            className="relative mt-4 mb-24 flex"
        >
            <input
                {...register("text")}
                type="text"
                className="w-4/5 h-12 text-sm font-medium pl-7 focus:outline-none rounded-sm rounded-r-none border border-slate-300"
                placeholder="하울의 움직이는 성 베이컨계란요리"
            ></input>
            <button
                type="submit"
                className="bg-brand100 rounded-sm rounded-l-none w-1/5 h-12 text-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white absolute top-3 ml-3 pointer-events-none"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </button>
        </form>
    );
};

export default SearchRecipeBar;
