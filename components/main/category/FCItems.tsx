import type { NextPage } from "next";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

const FCItems: NextPage = () => {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-95"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="menu-wh">
                <ul className="flex flex-col">
                    <Menu.Item>
                        <li className="pt-5 menu-items">
                            <Link href={`/searchPage/밥&도시락&면`}>
                                밥/도시락/면
                            </Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="menu-items">
                            <Link href={`/searchPage/국&탕&찌개`}>
                                국/탕/찌개
                            </Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="menu-items">
                            <Link href={`/searchPage/구이&볶음&찜`}>
                                구이/볶음/찜
                            </Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="menu-items">
                            <Link href={`/searchPage/튀김류`}>튀김류</Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="menu-items">
                            <Link href={`/searchPage/베이커리&디저트`}>
                                베이커리/디저트
                            </Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="menu-items">
                            <Link href={`/searchPage/음료&주류`}>
                                음료/주류
                            </Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="pb-5 menu-items">
                            <Link href={`/searchPage/식단&건강관리`}>
                                식단/건강관리
                            </Link>
                        </li>
                    </Menu.Item>
                </ul>
            </Menu.Items>
        </Transition>
    );
};

export default FCItems;
