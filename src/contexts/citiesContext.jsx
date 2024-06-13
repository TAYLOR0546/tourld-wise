/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const citiesContext = createContext();

// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://serve-cities.onrender.com";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        // in case we want to set the city created as the current city
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city._id !== action.payload),
        // resetting current city after a selected city is deleted
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const compData = await res.json();
        const data = compData.data.cities;
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(data);
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
      // alert("There was an error loading data...");
      // } finally {
      //   setIsLoading(false);
      // }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    // the id below is a string cuz it's from the url's queries
    // if(Number(id) === currentCity.id) return;
    if (Number(id) === currentCity._id) return;

    dispatch({ type: "loading" });

    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const compData = await res.json();
      const data = compData.data.city;
      // const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const compData = await res.json();
      const data = compData.data.city;
      // const data = await res.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch {
      // alert("There was an error creating the city...");
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      // setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      // alert("There was an error deleting the city...");
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
