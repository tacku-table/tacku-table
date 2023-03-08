import { Menu } from "@headlessui/react";
import CTItems from "./CTItems";

export default function FoodCategory() {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="header-cate-title">
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
        <CTItems />
      </Menu>
    </div>
  );
}
