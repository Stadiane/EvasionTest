import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HotelItem from "../components/HotelItem";

const FavorisScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  // Charger les favoris depuis AsyncStorage
  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HotelItem
            hotel={item}
            onPress={(hotelId) =>
              navigation.navigate("HotelDetail", { hotelId })
            }
            isFavorite={true} // Tous les hôtels ici sont des favoris
            toggleFavorite={() => toggleFavorite(item)}
          />
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
});

export default FavorisScreen;
