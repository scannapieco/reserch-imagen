import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Result } from "../interfaces";

interface FavoritesProps {
  onImageClick?: (img: Result) => void;
}

export const Favorites = ({ onImageClick }: FavoritesProps) => {
  const [favResults, setFavResults] = useState<Result[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favs") || "[]");
    // Filtra solo objetos válidos (con id y urls.small)
    const validFavs = favs.filter(
      (res: any) => res && res.id && res.urls && res.urls.small
    );
    setFavResults(validFavs);
  }, []);

  if (favResults.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No tienes favoritos aún.</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#2563eb" }}>Tus Favoritos</h2>
      <div className="grid-results">
        {favResults.map(res => (
          <Card key={res.id} res={res} onImageClick={onImageClick} />
        ))}
      </div>
    </div>
  );
};