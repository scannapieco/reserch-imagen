import { useState } from 'react';
import { Result } from '../interfaces';

export const useFormquery = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [allResults, setAllResults] = useState<Result[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const { form } = Object.fromEntries(new FormData(target));

        if (String(form).trim().length === 0) return;

        setQuery(String(form));
        // Cuando hagas la búsqueda y obtengas resultados, actualiza allResults:
        // Por ejemplo:
        // const data = await getImages(String(form), 1);
        // setAllResults(data.results);

        target.reset();
        target.focus();
    };

    const handleLoading = (loading: boolean) => setIsLoading(loading);

    return {
        query,
        isLoading,
        handleSubmit,
        handleLoading,
        allResults, // <-- ¡Agregado aquí!
        setAllResults // <-- Exporta el setter para actualizar desde fuera si lo necesitas
    };
};
