import { useState } from 'react'; 
import { Title } from "./components/Title";
import { Form } from "./components/Forms";
import { GridResults } from "./components/GridResults";

import { useFormquery } from "./hooks"; 

const App = () => {
  const { handleSubmit, query } = useFormquery(); 
  const [isLoading, setIsLoading] = useState(false); 

  // Esta es la función que pasamos a GridResults
  const handleLoading = (loading: boolean) => {
    setIsLoading(loading); 
  };

  return (
    <div>
      <Title />
      <Form handleSubmit={handleSubmit} isLoading={isLoading} />
      {query && query.length > 0 && (
        <GridResults query={query} handleLoading={handleLoading} /> 
      )}
      {isLoading && <p>Loading...</p>} {}

      
    </div>
  );
};

export default App;

