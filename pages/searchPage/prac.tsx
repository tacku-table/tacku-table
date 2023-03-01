import { dbService } from "@/config/firebase";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

const initialUrl = "http://swapi.dev/api/species";
// fetch : 리소스 비동기요청. 주로 API를 호출하고 응답 데이터를 받아오는 역할
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const InfiniteRecipe = () => {
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);
    const getList = async () => {
        // 첫페이지 데이터
        const first = query(
            collection(dbService, "recipe"),
            orderBy("createdAt", "desc"),
            limit(6)
        );
        const documentSnapshots = await getDocs(first);
        const newData = documentSnapshots.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setCurrentItems(newData);

        // 가져올 마지막 문서
        const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
        console.log("last", lastVisible);

        // 다음페이지 데이터
        // startAfter() = 시작점을 제외(lastVisible다음부터 가져옴)
        const next = query(
            collection(dbService, "recipe"),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(6)
        );
    };
    const {
        data,
        isFetching,
        isLoading,
        isError,
        error,
        fetchNextPage, //더많은 데이터가 필요할때 어떤함수를 실행할지 InfiniteScroll에 지시하는 역할
        hasNextPage, //수집할 데이터가 더 있는지 결정하는 불리언
    } = useInfiniteQuery(
        ["recipe"], // 쿼리키
        ({ pageParam = 1 }) => fetchPage(pageParam), //fetcher
        //쿼리함수는 객체 매개변수를 받고 프로퍼티중 하나로 pageParam을 갖고있다
        //pageParam은 fetchNextPage가 어떻게 보일지 결정하고, 다음 페이지가 있는지 결정(기본값인 initialUrl을 할당한다)
        //fetchUrl은 Url인 pageParam을 가져와서 json을 반환
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.page < lastPage.total_page) {
                    return lastPage.page + 1;
                }
            },
        } //옵션객체
        //getNextPageParam은 옵션으로 lastPage를 갖는다. 필요시 두번째 인자로 allPage도 넣을수있다
        //pageParam을 lastPage.next(json db안에 있는 객체)로 설정
        //fetchNextPage를 실행하면 next프로퍼티가 무엇인지에 따라 마지막 페이지에 도착한 다음 pageParam을 사용하게 된다
        // pageParam값은 데이터가 추가되면 갱신된다 (getNextPageParam)

        // hasNextPage는 위 함수의 undefined 반환여부에 따라 달라진다
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error! {error.toString()}</div>;
    // 캐시된 데이터가 없어서 새 데이터를 가져올때는 데이터가 정의되지않았으므로 undefined
    // 따라서 isLoading이나 isError로 조기반환 실행

    return (
        <>
            {isFetching && <div>Loading...</div>}
            <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
                {/* useInfiniteQuery에서 반환된 데이터는 useQuery(쿼리함수의 결과를 그대로 출력)와 맵핑된 모습이 다르다 */}
                {data.pages.map((pageData) => {
                    return pageData.results.map((item) => {
                        return (
                            <div key={item.id}>
                                <p className="text-lg text-slate-900 font-semibold mt-1">
                                    {item.foodTitle}
                                </p>
                                <p className="text-ellipsis overflow-hidden whitespace-nowrap text-blue100">
                                    {item.animationTitle}
                                </p>
                            </div>
                        );
                    });
                })}
            </InfiniteScroll>
        </>
    );
};

export default InfiniteRecipe;
