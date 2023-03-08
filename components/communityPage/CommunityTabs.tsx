import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import RecipeTab from "./RecipeTab";
import AnimeTab from "./AnimeTab";
import GossipTab from "./GossipTab";
import AllListTab from "./AllListTab";
import { cls } from "../../util";
const CommunityTabs = () => {
  //   탭바 변경 state
  let [categories] = useState([
    "전체",
    "요리 게시판",
    "애니 게시판",
    "잡담 게시판",
  ]);

  return (
    <div className="min-w-[860px]">
      <Tab.Group>
        <Tab.List className="text-base font-medium text-center text-gray-500 border-b border-mono60">
          <div className="flex flex-wrap -mb-px">
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  cls(
                    "mr-2 inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-brand100 ring-white focus:outline-none",
                    `${selected ? " text-brand100" : "text-mono100"}`
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </div>
        </Tab.List>
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
