import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement

  // Charger les favoris depuis AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      } catch (error) {
        console.error("Erreur lors du chargement des favoris :", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    loadFavorites();
  }, []);

  // Sauvegarde automatique des favoris dès qu'ils changent
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("favorites", JSON.stringify(favorites)).catch(
        (error) =>
          console.error("Erreur lors de la sauvegarde des favoris :", error)
      );
    }
  }, [favorites, loading]);

  // Ajouter ou retirer un favori
  const toggleFavorite = (hotel) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === hotel.id);

      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== hotel.id);
      } else {
        return [...prevFavorites, hotel];
      }
    });
  };

  // Ne pas rendre les enfants tant que le chargement des favoris n'est pas terminé
  if (loading) {
    return null;
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
