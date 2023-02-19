import type { NextPage } from "next";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

const CTItems: NextPage = () => {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-out duration-100"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute top-16 left-0 origin-top-right bg-white shadow-lg focus:outline-none z-50">
                <ul className="flex flex-col w-28">
                    <Menu.Item>
                        <li className="menu-items pt-4">
                            <Link href={`/searchPage/15분이하`}>15분</Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="menu-items">
                            <Link href={`/searchPage/30분이하`}>30분</Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="menu-items">
                            <Link href={`/searchPage/1시간이하`}>1시간</Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="menu-items pb-4">
                            <Link href={`/searchPage/1시간이상`}>
                                1시간이상
                            </Link>
                        </li>
                    </Menu.Item>
                </ul>
            </Menu.Items>
        </Transition>
    );
};

export default CTItems;
