import { Tab } from "@headlessui/react";
interface MyTabsProps {
  userInfo: any;
  setUserInfo: any;
}
const MyTabs = ({ userInfo, setUserInfo }: MyTabsProps) => {
  const uid = userInfo.userId;
  // 즐겨찾기

  // 내가 쓴 레시피

  // 커뮤니티 게시글

  // 커뮤니티 댓글
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-orange-300 p-1">
        <Tab className="py-2.5">즐겨찾기</Tab>
        <Tab className="py-2.5">내가 쓴 레시피</Tab>
        <Tab className="py-2.5">커뮤니티 게시글</Tab>
        <Tab className="py-2.5">커뮤니티 댓글</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>즐겨찾기 컨텐츠</Tab.Panel>
        <Tab.Panel>내가 쓴 레시피 컨텐츠</Tab.Panel>
        <Tab.Panel>커뮤니티 게시글 컨텐츠</Tab.Panel>
        <Tab.Panel>커뮤니티 댓글 컨텐츠</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default MyTabs;
