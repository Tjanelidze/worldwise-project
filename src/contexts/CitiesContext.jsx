import { createContext, useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCitites] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsloading(true);
        const rest = await fetch(`${BASE_URL}/cities`);
        const data = await rest.json();
        setCitites(data);
      } catch (error) {
        alert('There was an error loading data...');
      } finally {
        setIsloading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
