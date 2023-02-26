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
import React, { useEffect, useState } from "react";

const Prac = () => {
    const fetchProjects = ({ pageParam = 0 }) =>
        fetch("/api/projects?cursor=" + pageParam);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery("projects", fetchProjects, {
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    });

    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);

    const getList = async () => {
        // 첫페이지 데이터
        const first = query(
            collection(dbService, "recipe"),
            orderBy("createdAt", "desc"),
            limit(12)
        );
        const documentSnapshots = await getDocs(first);

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
            limit(12)
        );
        // const newData = documentSnapshots.docs.map((doc) => ({
        //     ...doc.data(),
        //     id: doc.id,
        // }));
        // setCurrentItems(newData);
    };
    useEffect(() => {
        getList();
    }, []);

    return status === "loading" ? (
        <p>Loading...</p>
    ) : status === "error" ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                    {group.projects.map((project) => (
                        <p key={project.id}>{project.name}</p>
                    ))}
                </React.Fragment>
            ))}
            <div>
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                        ? "Load More"
                        : "Nothing more to load"}
                </button>
            </div>
            <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
            </div>
        </>
    );
};

export default Prac;
