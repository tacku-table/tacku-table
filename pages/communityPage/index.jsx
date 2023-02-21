import { useEffect, useState } from "react";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Link from "next/link";
import CommunityTabs from "../../components/tabs/CommunityTabs";
import SliderScreen from "../../components/community/SliderScreen";

const Community = () => {
    return (
        <div className="flex flex-col items-center">
            <SliderScreen />
            <div>글 목록</div>
            <CommunityTabs />
            <div>
                <Link href="/communityPage/new">글 작성하기</Link>
            </div>
        </div>
    );
};

export default Community;
