import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    };

    loadFavorites();
  }, []);

  // Ajouter ou retirer un favori
  const toggleFavorite = async (hotel) => {
    let updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex((fav) => fav.id === hotel.id);

    if (index === -1) {
      updatedFavorites.push(hotel);
    } else {
      updatedFavorites.splice(index, 1);
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
