import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { ResponseAPI } from '../interfaces';
import { getImages } from "../utils";
import { Loading } from './Loading';

interface IGridResults {
    handleLoading: (e: boolean) => void;
    query: string;
}

export const GridResults = ({ query, handleLoading }: IGridResults) => {
    const { data, isLoading, error, isError } = useQuery<ResponseAPI>({
        queryKey: [query],
        queryFn: () => getImages(query),
    });

    useEffect(() => handleLoading(isLoading), [isLoading]);

    if (isLoading) return <Loading />;

    if (isError) return <p>{(error as AxiosError).message}</p>;

    return (
        <div>
            <p className='no-results'>
                {data && data.results.length === 0
                    ? `No results for: ${query}`
                    : `Results for: ${query}`}
            </p>

            <div className='grid'>
                {data?.results.map((res) => (
                    <div key={res.id}>
                        <img
                            src={res.urls.small} 
                            alt={res.alt_description || 'Imagen sin descripción'}
                        />
                        {res.description && <p>{res.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};
