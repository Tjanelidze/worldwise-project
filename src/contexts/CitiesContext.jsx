import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCitites] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setIsloading(true);
      const rest = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await rest.json();
      setCurrentCity(data);
    } catch (error) {
      alert('There was an error loading data...');
    } finally {
      setIsloading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsloading(true);
      const rest = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await rest.json();

      setCitites((cities) => [...cities, data]);
    } catch (error) {
      alert('There was an error creating city...');
    } finally {
      setIsloading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsloading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      setCitites((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert('There was an error deleting city...');
    } finally {
      setIsloading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');

  return context;
}

export { CitiesProvider, useCities };
