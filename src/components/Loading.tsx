export const Loading = ({ message = "Cargando..." }: { message?: string }) => (
  <div className="loading" role="status" aria-live="polite">
    <div className="spinner"></div>
    <span>{message}</span>
  </div>
);