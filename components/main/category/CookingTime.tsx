import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

export default function FoodCategory() {
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium hover:bg-main hover:text-white hover:transition hover:ease-out hover:duration-300 focus:outline-none gap-1">
                        조리시간
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
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-out duration-100"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 mt-2 origin-top-right bg-white shadow-lg focus:outline-none z-50">
                        <div className="flex flex-col w-28">
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href="/searchPage/[cate]"
                                    as={`/searchPage/15분이하`}
                                >
                                    <a className="px-4 py-3 pt-4 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        15분
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href="/searchPage/[cate]"
                                    as={`/searchPage/30분이하`}
                                >
                                    <a className="px-4 py-3 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        30분
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href="/searchPage/[cate]"
                                    as={`/searchPage/1시간이하`}
                                >
                                    <a className="px-4 py-3 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        1시간
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    legacyBehavior
                                    href="/searchPage/[cate]"
                                    as={`/searchPage/1시간이상`}
                                >
                                    <a className="px-4 py-3 pb-4 text-sm text-gray-900 hover:bg-hoverGray hover:text-main">
                                        1시간이상
                                    </a>
                                </Link>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
