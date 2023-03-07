import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import RecipeTab from "./RecipeTab";
import AnimeTab from "./AnimeTab";
import GossipTab from "./GossipTab";
import AllListTab from "./AllListTab";
import { cls } from "../../util";

const CommunityTabs = () => {
  //   탭바 변경 state
  let [categories] = useState<string[]>([
    "전체 글목록",
    "요리게시판",
    "애니게시판",
    "잡담게시판",
  ]);

  return (
    <div className="w-[860px]">
      <Tab.Group>
        <Tab.List className="flex w-[780px] rounded-sm p-1 mx-auto my-6">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                cls(
                  " w-full h-[55px] py-2.5 text-sm font-medium leading-5 border-y border-l border-mono50 last:border-r",
                  "ring-white focus:outline-none",
                  `${selected ? " text-brand100" : "text-mono100"}`
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <h4 className="w-full text-2xl font-bold pb-4 border-b-2 border-brand100">
          커뮤니티
        </h4>
        <Tab.Panels>
          <AllListTab />
          <RecipeTab categories={categories} />
          <AnimeTab categories={categories} />
          <GossipTab categories={categories} />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CommunityTabs;
