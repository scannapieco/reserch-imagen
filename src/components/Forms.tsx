
interface iForm{
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
}

export const Form = ({handleSubmit,isLoading}: iForm) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="form" disabled={isLoading} placeholder="Example: superman"/>
            <button>Search</button>
        </form>
    )
}