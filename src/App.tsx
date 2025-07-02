import { useState } from 'react';
import { Navbar } from './components/NavBar';
import { Title } from "./components/Title";
import { Form } from "./components/Forms";
import { GridResults } from "./components/GridResults";
import { Favorites } from "./components/Favorites";
import { ImageModal } from "./components/Modal";
import { useFormquery } from "./hooks";
import './App.css';
import { Result } from './interfaces';

const App = () => {
  const { handleSubmit, query, setAllResults } = useFormquery();
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showFavs, setShowFavs] = useState(false);
  const [modalImage, setModalImage] = useState<Result | null>(null);

  const handleLoading = (loading: boolean) => setIsLoading(loading);
  const toggleDarkMode = () => setDarkMode((v) => !v);

  // Calcula la cantidad de favoritos antes del return (ahora son objetos completos)
  const favCount = JSON.parse(localStorage.getItem("favs") || "[]").length;

  return (
    <div className={`app-container${darkMode ? " dark" : ""}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        showFavs={showFavs}
        setShowFavs={setShowFavs}
        favCount={favCount}
      >
        <Form handleSubmit={handleSubmit} isLoading={isLoading} />
      </Navbar>

      <Title />
      {showFavs ? (
        <Favorites onImageClick={setModalImage} />
      ) : (
        query && query.length > 0 && (
          <GridResults
            query={query}
            handleLoading={handleLoading}
            setAllResults={setAllResults}
            onImageClick={setModalImage}
          />
        )
      )}
      {isLoading && (
        <div className="loading-container" aria-live="polite"></div>
      )}
      <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
    </div>
  );
};

export default App;