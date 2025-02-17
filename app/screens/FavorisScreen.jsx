import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Importer useNavigation
import HotelItem from "../components/HotelItem";

const FavorisScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  // Charger les favoris depuis AsyncStorage
  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
  };

  // Charger les favoris au focus de l'écran
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  // Fonction qui retire un hôtel des favoris et mettre à jour AsyncStorage
  const handleToggleFavorite = async (hotel) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== hotel.id);
    setFavorites(updatedFavorites); // Mise à jour immédiate de l'UI
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Sauvegarde dans AsyncStorage
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HotelItem
            hotel={item}
            onPress={() => {
              // Naviguer vers la page de détails de l'hôtel
              navigation.navigate("HotelDetail", { hotelId: item.id });
            }}
            onToggleFavorite={() => {
              handleToggleFavorite(item);
            }} // Suppression en temps réel
            isFavorite={favorites.some((fav) => fav.id === item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun favori pour l’instant</Text>
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
