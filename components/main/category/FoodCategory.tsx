import { Menu } from "@headlessui/react";
import FCItems from "./FCItems";

export default function FoodCategory() {
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="px-3 py-7 flex justify-center items-center font-medium hover:text-main hover:transition hover:ease-out hover:duration-300 focus:outline-none gap-1">
                        음식종류
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-3 h-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </Menu.Button>
                </div>
                <FCItems />
            </Menu>
        </div>
    );
}
