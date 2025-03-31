import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Importer useNavigation
import HotelItem from "../components/HotelItem";
import { DeviceEventEmitter } from "react-native";

const FavorisScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  console.log("Navigation :", navigation);

  // Charger les favoris depuis AsyncStorage
  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    const validFavorites = parsedFavorites.filter((item) => item && item.id);
    setFavorites(validFavorites);
  };

  // Charger les favoris au montage du composant
  useEffect(() => {
    loadFavorites();
    const reloadFavorites = () => {
      console.log("Mise à jour des favoris détectée !");
      loadFavorites();
    };

    // Ajouter l'écouteur d'événement
    const subscription = DeviceEventEmitter.addListener(
      "favoritesUpdated",
      reloadFavorites
    );

    return () => {
      //Supprimer l'écouteur proprement avec `.remove()`
      subscription.remove();
    };
  }, []);

  // Charger les favoris au focus de l'écran
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  // Fonction qui retire un hôtel des favoris et mettre à jour AsyncStorage
  const handleToggleFavorite = async (hotel) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== hotel.id);
    console.log("Updated favorites:", updatedFavorites); // Vérifie la mise à jour
    setFavorites(updatedFavorites); // Mise à jour immédiate de l'UI
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Sauvegarde dans AsyncStorage
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) =>
          item && item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => {
          if (!item || !item.id) {
            console.warn("Element favori invalide :", item);
            return null; // Évite d'afficher un élément invalide
          }
          return (
            <HotelItem
              hotel={item}
              onPress={() => {
                // Naviguer vers "HotelDetail" en passant par "Accueil" (HomeStack)
                navigation.navigate("Accueil", {
                  screen: "HotelDetail",
                  params: { hotelId: item.id },
                });
              }}
              onToggleFavorite={() => {
                handleToggleFavorite(item);
              }} // Suppression en temps réel
              isFavorite={favorites.some((fav) => fav.id === item.id)}
            />
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun favori pour l'instant</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});

export default FavorisScreen;
