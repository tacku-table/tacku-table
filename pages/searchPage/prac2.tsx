import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

interface Iperson {
    id: number;
    name: string;
    phone: string;
    age: number;
}

const InfiniteScroll = (): JSX.Element => {
    // ref
    const observerRef = useRef<IntersectionObserver>();
    const boxRef = useRef<HTMLDivElement>(null);

    const getPersons = () => {
        const res = useInfiniteQuery(
            ["infinitePersons"],
            ({ pageParam = 0 }) => axios.get("http://localhost:8080/persons"),
            {
                getNextPageParam: (lastPage, allPages) => {
                    // 다음 페이지 요청에 사용될 pageParam값 return 하기
                    return true; // 여기서는 pageParam을 따로 사용하지 않기 떄문에 true return
                },
            }
        );

        // IntersectionObserver 설정
        const intersectionObserver = (
            entries: IntersectionObserverEntry[],
            io: IntersectionObserver
        ) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 관찰하고 있는 entry가 화면에 보여지는 경우
                    io.unobserve(entry.target); // entry 관찰 해제
                    res.fetchNextPage(); // 다음 페이지 데이터 요청
                }
            });
        };

        // useEffect
        useEffect(() => {
            if (observerRef.current) {
                // 기존에 IntersectionObserver이 있을 경우
                observerRef.current.disconnect(); // 연결 해제
            }

            observerRef.current = new IntersectionObserver(
                intersectionObserver
            ); // IntersectionObserver 새롭게 정의
            boxRef.current && observerRef.current.observe(boxRef.current); // boxRef 관찰 시작
        }, [res]); // res값이 변경될때마다 실행

        // 로딩 중일 경우
        if (res.isLoading) {
            return <div>Loading...</div>;
        }

        // 결과값이 전달되었을 경우
        if (res.data) {
            return (
                <div>
                    {res.data.pages.map((page, pageIndex) => {
                        const persons: Iperson[] = page.data;

                        return persons.map((person, personIndex) => {
                            return (
                                <div
                                    key={`${person.id}/${pageIndex}`}
                                    // 가장 마지막에 있는 Box를 boxRef로 등록
                                    ref={
                                        persons.length * pageIndex +
                                            personIndex ===
                                        res.data.pages.length * persons.length -
                                            1
                                            ? boxRef
                                            : null
                                    }
                                >
                                    <div>{person.id}.</div>
                                    <div>{person.name}</div>
                                    <div>({person.age})</div>
                                </div>
                            );
                        });
                    })}
                </div>
            );
        }
    };

    return <div>{getPersons()}</div>;
};
