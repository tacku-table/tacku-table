import { FieldErrors, useForm } from "react-hook-form";

const SearchTextBar = ({ setText }: TypeSearchTextProps) => {
    const { register, handleSubmit, getValues } = useForm();
    const onValid = () => {
        sessionStorage.setItem("searchData", getValues("searchText"));
        setText(getValues("searchText"));
    };
    const onInValid = (errors: FieldErrors) => {
        console.log(errors);
    };

    return (
        <form
            onSubmit={handleSubmit(onValid, onInValid)}
            className="relative mt-20 mb-10 flex w-full justify-center"
        >
            <input
                {...register("searchText")}
                type="text"
                className="w-3/5 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-1/4 h-12 text-sm font-medium pl-7 focus:outline-none rounded-sm rounded-r-none border border-slate-300"
                placeholder="어떤 요리를 찾아 볼까요"
            ></input>
            <button
                type="submit"
                className="bg-brand100 rounded-sm rounded-l-none w-14 h-12 text-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white absolute top-3 ml-4 pointer-events-none"
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

export default SearchTextBar;
