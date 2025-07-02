import { useState, useEffect } from "react";
import { Result } from "../interfaces";

interface ImageModalProps {
  image: Result | null;
  onClose: () => void;
}

export const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (image) {
      const favs = JSON.parse(localStorage.getItem("favs") || "[]");
      setFav(favs.includes(image.id));
    }
  }, [image]);

  const toggleFav = () => {
    if (!image) return;
    let favs = JSON.parse(localStorage.getItem("favs") || "[]");
    if (favs.includes(image.id)) {
      favs = favs.filter((id: string) => id !== image.id);
    } else {
      favs.push(image.id);
    }
    localStorage.setItem("favs", JSON.stringify(favs));
    setFav(!fav);
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image.urls.full;
    link.download = image.id + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!image) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={image.urls.regular} alt={image.alt_description || "Imagen"} />
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <button
            className={`fav-btn${fav ? " active" : ""}`}
            onClick={toggleFav}
            title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
            type="button"
          >
            {fav ? "★ Favorito" : "☆ Guardar en favoritos"}
          </button>
          <button
            className="download-btn"
            onClick={downloadImage}
            type="button"
            style={{ background: "#2563eb", color: "#fff", borderRadius: "1.5rem", padding: "0.5rem 1.2rem", border: "none", cursor: "pointer" }}
          >
            Descargar
          </button>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>
    </div>
  );
};