import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import { ResponseAPI, Result } from '../interfaces';
import { getImages } from "../utils";
import { Loading } from './Loading';
import { Card } from './Card';

interface IGridResults {
    handleLoading: (e: boolean) => void;
    query: string;
    setAllResults: (results: Result[]) => void;
    onImageClick?: (img: Result) => void;
}

export const GridResults = ({ query, handleLoading, setAllResults, onImageClick }: IGridResults) => {
    const observerRef = useRef<HTMLDivElement | null>(null);

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<ResponseAPI, Error>({
        queryKey: [query],
        queryFn: ({ pageParam = 1 }) => getImages(query, pageParam),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.total_pages > allPages.length) {
                return allPages.length + 1;
            }
            return undefined;
        },
        enabled: !!query,
        initialPageParam: 1,
    });

    useEffect(() => handleLoading(isLoading || isFetchingNextPage), [isLoading, isFetchingNextPage]);

    // Junta todos los resultados de todas las páginas y actualiza allResults
    const results = data?.pages.flatMap(page => page.results) || [];
    useEffect(() => {
        const unique = Array.from(new Map(results.map(item => [item.id, item])).values());
        setAllResults(unique);
    }, [results, setAllResults]);

    useEffect(() => {
        if (!hasNextPage || isLoading) return;
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        if (observerRef.current) observer.observe(observerRef.current);
        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasNextPage, fetchNextPage, isLoading]);

    if (isLoading) return <Loading />;
    if (isError) return <p>{error.message}</p>;

    return (
        <div>
            <p className='no-results'>
                {results.length === 0
                    ? `No se encontraron resultados para: ${query}`
                    : `Resultados para: ${query}`}
            </p>
            <div className="grid-results">
                {results.map((res) => (
                    <Card key={res.id} res={res} onImageClick={onImageClick} />
                ))}
            </div>
            <div ref={observerRef} style={{ height: 40 }} />
            {isFetchingNextPage && <Loading />}
        </div>
    );
};