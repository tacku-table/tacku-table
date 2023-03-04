import React from "react";

const MyCommentTab = () => {
  return (
    <Tab.Panel>
      {commentPost?.map((p) => (
        <div key={p.postId} className="px-6 mb-5">
          <hr className="border-border mx-8 mb-6 border-[1px]" />
          <div className="pl-8 space-x-[20px] items-center flex">
            <div className="flex flex-col">
              <div className="text-2xl font-semibold mb-4">
                <Link legacyBehavior href={`/communityPage/${p.boardId}`}>
                  <a>{p.comment}</a>
                </Link>
              </div>
              {communityList.map(
                (item) =>
                  item.id === p.boardId && (
                    <div key={item.id}>
                      <div className="space-x-[10px] text-mono70">
                        <span>
                          {item.category}
                          게시판
                        </span>
                      </div>
                      <div className="text-mono70">{item.title}</div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </Tab.Panel>
  );
};

export default MyCommentTab;
