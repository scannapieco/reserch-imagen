interface iForm{
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
}

export const Form = ({handleSubmit, isLoading}: iForm) => {
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                className="search-input"
                type="text"
                name="form"
                disabled={isLoading}
                placeholder="Buscar imágenes..."
                autoComplete="off"
            />
            <button className="search-btn" disabled={isLoading}>
                {isLoading ? "Buscando..." : "Buscar"}
            </button>
        </form>
    );
}