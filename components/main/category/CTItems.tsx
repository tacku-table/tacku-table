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
            <Menu.Items className="menu-wh">
                <ol className="flex flex-col">
                    <Menu.Item>
                        <li>
                            <Link
                                href={`/searchPage/15분이하`}
                                className="menu-items"
                            >
                                15분
                            </Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li>
                            <Link
                                href={`/searchPage/30분이하`}
                                className="menu-items"
                            >
                                30분
                            </Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li>
                            <Link
                                href={`/searchPage/1시간이하`}
                                className="menu-items"
                            >
                                1시간
                            </Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li>
                            <Link
                                href={`/searchPage/1시간이상`}
                                className="menu-items pb-5"
                            >
                                1시간이상
                            </Link>
                        </li>
                    </Menu.Item>
                </ol>
            </Menu.Items>
        </Transition>
    );
};

export default CTItems;
