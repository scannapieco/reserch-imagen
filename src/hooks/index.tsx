import { useState } from 'react';

export const useFormquery = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        
        const { form } = Object.fromEntries(new FormData(target));

        
        if (String(form).trim().length === 0) return;

        setQuery(String(form));  
        target.reset();
        target.focus();
    };

    const handleLoading = (loading: boolean) => setIsLoading(loading);

    return {
        query, isLoading, handleSubmit, handleLoading
    };
};

