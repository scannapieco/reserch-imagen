import { useState, useEffect } from "react";
import { Result } from "../interfaces"

interface ICard {
    res: Result;
    onImageClick?: (img: Result) => void;
}

export const Card = ({res, onImageClick}: ICard) => {
    const [fav, setFav] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favs") || "[]");
        setFav(favs.includes(res.id));
    }, [res.id]);

  const toggleFav = () => {
  let favs: Result[] = JSON.parse(localStorage.getItem("favs") || "[]");
  const exists = favs.some((img) => img.id === res.id);

  if (exists) {
    favs = favs.filter((img) => img.id !== res.id);
  } else {
    favs.push(res); // Guarda el objeto completo
  }
  localStorage.setItem("favs", JSON.stringify(favs));
  setFav(!fav);
};
    return (
        <div className="card">
            <button
                className={`fav-btn${fav ? " active" : ""}`}
                onClick={toggleFav}
                title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
                type="button"
            >
                {fav ? "★" : "☆"}
            </button>
            <div className="card-img-container">
                <img
                    src={res.urls.small}
                    alt={res.alt_description || 'photo'}
                    loading="lazy"
                    className="grid-image"
                    onClick={() => onImageClick && onImageClick(res)}
                    style={{ cursor: "zoom-in" }}
                />
                {/* ...botón de descarga y resto igual... */}
            </div>
            {/* ...resto igual... */}
        </div>
    )
}